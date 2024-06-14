const { Extension } = require('../../sql/models');

const getExtensionsByGameId = async (gameId) => {
  try {
    const extensions = await Extension.findAll(
      { 
        where: { gameId, deleted: false },
        include: [{
          model: File,
          where: {
            deleted: false
          },
          required: false
        }]
      }
    );
    return extensions;
  } catch (error) {
    throw error;
  }
};

const deleteExtensionsByGameId = async (gameId, t) => {
  try {
    await Extension.update(
      { deleted: true },
      { where: { gameId }}
    );
    return;
  } catch (error){
    throw error;
  }
};

module.exports = {
  deleteExtensionsByGameId,
  getExtensionsByGameId,
}