const { connection } = require('../../sql/connection-sql');
const { deleteExtensionsByGameId } = require('../extensions/extensions.utils');
const { deleteVersionsByGameId } = require('../versions/versions.utils');
const { getBrandById } = require('../brands/brands.utils');
const { getFamilybyId } = require('../families/families.utils');
const {Game, Brand } = require('../../sql/models');
const File = require("../../sql/models/file");

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
  const filesToSave = files.map((file, index) => {
    return  {
      name: file.filename,
      url: `${process.env.FILES_BASE_URL}${file.path}`,
      size: file.size,
      type: file.mimetype,
      is_main: !index
    };
  });
  try {
    Game.create(
    {
      ...body,
      files: [filesToSave]
    },
    {
      include: [
        {
          association: File
        }
      ]
    }
  );
    return;
  } catch (error) {
    throw error;
  }
};

const updateGame = async (id, body) => {
  try {
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
