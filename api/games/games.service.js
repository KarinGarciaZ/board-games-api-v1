const { deleteExtensionsByGameId } = require('../extensions/extensions.utils');
const { deleteVersionsByGameId } = require('../versions/versions.utils');
const { formatFile } = require('../files/files.utils');
const {Game, Brand } = require('../../sql/models');
const File = require("../../sql/models/file");
const { sequelize } = require('../../sql/sequelize-connection');

const getGames = async () => {
  try {
    const games = await Game.findAll({
      where: {
        deleted: false
      },
      include: [
        {
          model: Brand,
          where: {
            deleted: false
          },
          required: false
        }
      ]
    })
    return games;
  } catch (error) {
    throw error;
  }
};

const getGame = async (gameId) => {
  try {
    const game = await Game.findOne({
      where: {
        id: gameId,
        deleted: false
      },
      include: [
        {
          all: true,
          where: {
            deleted: false,
          },
          required: false
        }
      ]
    });
    return game;
  } catch (error) {
    throw error;
  }
};

const addGame = async (body, files) => {
  const t = await sequelize.transaction();
  const filesToSave = files.map(formatFile);
  try {
    await Game.create(
    {
      ...body,
      files: filesToSave
    },
    {
      include: File,
      transaction: t
    }
  );
    await t.commit();
    return;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const updateGame = async (gameId, game, imagesToDelete, mainImageId, files) => {
  const t = await sequelize.transaction();
  
  try {
    if (mainImageId || files.length) {
      const filesToSave = files.map(formatFile);

      if(imagesToDelete.length) {
        await File.update(
          { deleted: true },
          {
            where: {
              id:[ ...imagesToDelete ]
            },
            transaction: t
          }
        );
      };

      const gameToUpdate = await Game.findOne({ 
        where: {
          id: gameId,
          deleted: false
        },
        include: [
          {
            model: File,
            where: { deleted: false },
            transaction: t,
            required: false
          }
        ]
      });

      const filesIds = gameToUpdate.files.map(file => file.id);

      await File.update(
        { is_main: false },
        {
          where: {
            id: filesIds,
            is_main: true
          },
          transaction: t
        }
      );

      if (mainImageId) {
        await File.update(
          { is_main: true },
          { where: { 
              id: mainImageId
            },
            transaction: t
          }
        );
        if (filesToSave.length) {
          filesToSave[0].is_main = false;
        }
      };
      if (filesToSave.length) {
        const filesToAdd = await File.bulkCreate(
          [ ...filesToSave ] ,
          { 
            transaction: t
          }
        );
        await gameToUpdate.addFiles(filesToAdd, { transaction: t });
      }
    };
   
    await Game.update(game, {
      where: {
        id: gameId
      },
      transaction: t
    });

    t.commit();
    return;
  } catch (error) {
    t.rollback();
    throw error;
  };
};

const deleteGame = async (gameId) => {
  const t = await sequelize.transaction();
  try {
    await Game.update(
      { deleted: true },
      {
        where: {
          id: gameId
        },
        transaction: t
      }
    );
    await deleteVersionsByGameId(gameId, t);
    await deleteExtensionsByGameId(gameId, t);
    await t.commit();
    return;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  getGames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
};
