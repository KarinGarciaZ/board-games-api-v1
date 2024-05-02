const { connection } = require('../../sql/connection-sql');
const Game = require('../../sql/models/game');

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
  // try {
  //   const [gamesRows] = await connection.query(`
  //     SELECT * FROM games WHERE family_id = ? AND deleted = false`,
  //     [familyId]
  //   );
  //   return gamesRows;
  // } catch (error) {
  //   throw error;
  // }
};

const getGamesByBrandId = async (brandId) => {
  try {
    const [gamesRows] = await connection.query(`
      SELECT * FROM games WHERE brand_id = ? AND deleted = false`,
      [brandId]
    );
    return gamesRows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getGamesByFamilyId,
  getGamesByBrandId
};

