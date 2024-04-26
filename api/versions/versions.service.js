const { connection } = require('../../sql/connection-sql');
const {saveFile} = require('../files/files.utils');

const getVersionsByGameId = async (gameId) => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM versions where game_id = ? AND deleted = false', [gameId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createVersion = async (version, files) => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    const [createdVersion] = await newConnection.query('INSERT INTO versions SET ?', [version]);
    if (files.length) {
      const filesIds = await Promise.all(files.map(async (file, index) => {
        const id = await saveFile(file, index, newConnection);
        return id;
      }));

      const fileVersion = { version_id: createdVersion.insertId };

      for (const fileId of filesIds) {
        fileVersion.file_id = fileId;
        await newConnection.query('INSERT INTO version_files SET ?', [fileVersion]);
      }
    }
    await newConnection.commit();
    return;
  } catch (error) {
    await newConnection.rollback();
    throw error;
  }
};

const updateVersion = async (id , version) => {
  try {
    await connection.query('UPDATE versions SET ? WHERE id = ?', [version, id]);
    return;
  } catch (error) {
    throw error;
  }
};

const deleteVersion = async (id) => {
  try {
    await connection.query('UPDATE versions SET deleted = true WHERE id = ?', [id]);
    return;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getVersionsByGameId,
  createVersion,
  updateVersion,
  deleteVersion
};
