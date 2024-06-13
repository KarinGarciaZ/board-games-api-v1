const { Extension } = require('../../sql/models');

const getExtensionsByGameId = async (id) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM extensions WHERE game_id = ? AND deleted = false`, [id]);
    return rows;
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

const getExtensionFilesByExtensionId = async (extensionId, conn) => {
  try {
    const [extensionFiles] = await conn.query(`SELECT * FROM extensions_files WHERE extensions_id = ?`, [extensionId]);
    return extensionFiles
  } catch (error) {
    throw error;
  }
};

module.exports = {
  deleteExtensionsByGameId,
  getExtensionsByGameId,
  getExtensionFilesByExtensionId
}