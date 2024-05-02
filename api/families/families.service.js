// const { connection } = require('../../sql/connection-sql');
const { getGamesByFamilyId } = require('../games/games.utils');
const { deleteExtensionByGameId } = require('../extensions/extensions.utils');
const { deleteVersionByGameId } = require('../versions/versions.utils');
// const { getFamilybyId } = require('../families/families.utils');
const Family = require('../../sql/models/family');
const { sequelize } = require('../../sql/sequelize-connection');
const Game = require('../../sql/models/game');

const getFamilies = async () => {
  try {
    const families = await Family.findAll({
      where: {
        deleted: false
      },
      raw: true
    });
    const familiesWithGames = families.map(async (family) => {
      const games = await getGamesByFamilyId(family.id);
      return {
        ...family,
        games
      }
    });
    const familiesData = await Promise.all(familiesWithGames);
    // const [rows] = await connection.query(`SELECT * FROM families WHERE deleted = false`);
    // const newFamilies = rows.map(async (row) => {
    //     const familyId = row.id;
    //     const games = await getGamesByFamilyId(familyId);
    //     return {
    //       ...row,
    //       games
    //     }
    // });
    // const families = await Promise.all(newFamilies);
    return familiesData;
  } catch (error) {
    throw error;
  }
};

const getFamily = async (familyId) => {
  try {
    const family = await Family.findOne({
      where: {
        id: familyId,
        deleted: false
      },
      raw: true
    });
    const games = await getGamesByFamilyId(familyId);
    // const family = await getFamilybyId(familyId);
    // const games = await getGamesByFamilyId(familyId);
    if (family) {
      return {
        ...family,
        games
      };
    }
    return {};
  } catch (error) {
    throw error;
  }
};

const addFamily = async (body) => {
  try {
    await Family.create(body);
    // const [row] = await connection.query(`INSERT INTO families SET ?`, [body]);
    return;
  } catch (error) {
    throw error;
  }
}

const updateFamily = async (id, body) => {
  try {
    await Family.update(body, {
      where: {
        id,
      }
    });
    // await connection.query(`UPDATE families SET ? WHERE id = ?`, [body, id]);
    return;
  } catch (error) {
    throw error;
  }
};

const deleteFamily = async (id) => {
  const t = await sequelize.transaction();
  try {
    await Family.update(
      { deleted: true },
      {
        where: {
          id
        },
        transaction: t
      }
    );
    const games = await getGamesByFamilyId(id);
    for (const game of games) {
      await deleteVersionByGameId(game.id, t);
      await deleteExtensionByGameId(game.id, t);
    };
    // await newConnection.query(`UPDATE families SET deleted = true WHERE id = ?`, [id]);
    // const games = await getGamesByFamilyId(id);
    // for (const game of games) {
    //   await deleteVersionByGameId(game.id, newConnection);
    //   await deleteExtensionByGameId(game.id, newConnection);
    // };
    await Game.update(
      { deleted: true },
      {
        where: {
          familyId: id
        },
        transaction: t
      }
    )
    // await newConnection.query(`UPDATE games SET deleted = true WHERE family_id = ?`, [id]);
    await t.commit();
    return;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  getFamilies,
  getFamily,
  updateFamily,
  addFamily,
  deleteFamily
}