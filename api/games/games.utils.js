const { Game } = require('../../sql/models');

const getGamesByFamilyId = async (familyId) => {
  try {
    const games = await Game.findAll({
      where: {
        familyId,
        deleted: false
      }
    });
    return games;
  } catch (error) {
    throw error;
  }
};

const getGamesByBrandId = async (brandId) => {
  try {
    const games = await Game.findAll({
      where: {
        brandId,
        deleted: false
      }
    });
    return games;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getGamesByFamilyId,
  getGamesByBrandId
};

