const { connection } = require('../../sql/connection-sql');
const { Version } = require('../../sql/models');

const deleteVersionsByGameId = async (gameId, t) => {
  try {
    await Version.update(
      { deleted: true },
      { where: { gameId } }
    );
    return;
  } catch (error){
    throw error;
  }
};

const getVersionsByGameId = async (gameId) => {
  try {
    const versions = await Version.findAll(
      { 
        where: { gameId, deleted: false },
        include: [{ 
          model: File, 
          where: { deleted: false },
          required: false
        }]
      }
    )
    return versions;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  deleteVersionsByGameId,
  getVersionsByGameId,
};