const Extension = require("../../sql/models/extension");

const getExtensionsByGameId = async (id) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM extensions WHERE game_id = ? AND deleted = false`, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteExtensionByGameId = async (gameId, conn) => {
  try {
    await Extension.update(
      { deleted: true },
      {
        where: {
          gameId
        },
        transaction: conn
      }
    )
    // await conn.query(`UPDATE extensions SET deleted = true WHERE game_id = ?`, [gameId]);
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
  deleteExtensionByGameId,
  getExtensionsByGameId,
  getExtensionFilesByExtensionId
}