const { connection } = require('../../sql/connection-sql');
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

const updateGame = async (gameId, body, imagesToDelete, mainImage, files) => {
  //format files to send
  try {
    Game.update(body, {
      where: {
        id: gameId
      }
    });
    await connection.query(`UPDATE games SET ? WHERE id = ?`, [body, id]);
    return;
  } catch (error) {
    throw error;
  }
};

const deleteGame = async (id) => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    await newConnection.query(`UPDATE games SET deleted = true WHERE id = ?`, [id]);
    await deleteVersionsByGameId(id, newConnection);
    await deleteExtensionsByGameId(id, newConnection);
    await newConnection.commit();
    return;
  } catch (error) {
    await newConnection.rollback();
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
