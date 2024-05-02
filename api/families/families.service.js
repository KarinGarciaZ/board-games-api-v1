const { getGamesByFamilyId } = require('../games/games.utils');
const { deleteExtensionByGameId } = require('../extensions/extensions.utils');
const { deleteVersionByGameId } = require('../versions/versions.utils');
const Family = require('../../sql/models/family');
const { sequelize } = require('../../sql/sequelize-connection');
const Game = require('../../sql/models/game');

const getFamilies = async () => {
  try {
    const families = await Family.findAll({
      where: {
        deleted: false
      },
      include: [
        {
          model: Game,
          where: {
            deleted: false,
          }
        }
      ]
    });
    return families;
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
      include: [
        {
          model: Game,
          where: {
            deleted: false,
          }
        }
      ]
    });
    return family ? family : {};
  } catch (error) {
    throw error;
  }
};

const addFamily = async (body) => {
  try {
    await Family.create(body);
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
    await Game.update(
      { deleted: true },
      {
        where: {
          familyId: id
        },
        transaction: t
      }
    )
    const games = await getGamesByFamilyId(id);
    for (const game of games) {
      await deleteVersionByGameId(game.id, t);
      await deleteExtensionByGameId(game.id, t);
    };
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