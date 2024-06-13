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
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    const versionsToReturn = [];
    const [versions] = await newConnection.query(
      'SELECT * FROM versions where game_id = ? AND deleted = false', [gameId]
    );
    for (const version of versions) {
      const filesVersions = await getVersionsFilesByVersionId(version.id, newConnection);
      const files = [];
      for (const fileVersion of filesVersions) {
        const [filesRows] = await newConnection.query('SELECT * FROM files WHERE id = ? AND deleted = false', [fileVersion.file_id]);
        if (filesRows.length) {
          files.push(filesRows[0]);
        }
      }
      versionsToReturn.push({...version, files});
    }
    await newConnection.commit();
    return versionsToReturn;
  } catch (error) {
    await newConnection.rollback();
    throw error;
  }
};

const getVersionsFilesByVersionId = async (versionId, conn) => {
  const [filesVersions] = await conn.query(
    'SELECT * from version_files WHERE version_id = ?',[versionId]
  );
  return filesVersions;
};

module.exports = {
  deleteVersionsByGameId,
  getVersionsByGameId,
  getVersionsFilesByVersionId
};