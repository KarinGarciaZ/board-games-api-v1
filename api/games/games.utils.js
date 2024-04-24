const { connection } = require('../../sql/connection-sql');

const getGamesByFamilyId = async (familyId) => {
  try {
    const [gamesRows] = await connection.query(`
      SELECT * FROM games WHERE family_id = ? AND deleted = false`,
      [familyId]
    );
    return gamesRows;
  } catch (error) {
    throw error;
  }
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

