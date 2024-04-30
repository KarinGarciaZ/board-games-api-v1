const { connection } = require('../../sql/connection-sql');
const { saveFile, updateFileMainColumn, deleteFile } = require('../files/files.utils');
const { getVersionsFilesByVersionId } = require('./versions.utils');
const Version = require('../../sql/models/version');
const VersionFiles = require('../../sql/models/versionFiles');

const createVersion = async (version, files) => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    const [createdVersion] = await newConnection.query('INSERT INTO versions SET ?', [version]);
    if (files.length) {
      const filesIds = await Promise.all(files.map(async (file, index) => {
        const id = await saveFile(file, newConnection, index);
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

const updateVersion = async (id ,version, files, imagesToDelete, mainImage) => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();

    await newConnection.query('UPDATE versions SET ? WHERE id = ?', [version, id]);

    let firstInsertedFileId = 0;
    if (files.length) {
      const filesIds = await Promise.all(files.map(async (file) => {
        const id = await saveFile(file, newConnection);
        return id;
      }));

      firstInsertedFileId = filesIds[0];
      const fileVersion = { version_id: id };

      for (const fileId of filesIds) {
        fileVersion.file_id = fileId;
        await newConnection.query('INSERT INTO version_files SET ?', [fileVersion]);
      }
    }

    if (imagesToDelete.length) {
      for (const imageId of imagesToDelete) {
        await deleteFile(imageId, newConnection);
      }
    }

    const filesVersions = await getVersionsFilesByVersionId(id, newConnection);
    for (const fileVersion of filesVersions) {
      await updateFileMainColumn(false, fileVersion.file_id, newConnection);
    }

    const fileIdToBeMain = mainImage ? mainImage : firstInsertedFileId;
    await updateFileMainColumn(true, fileIdToBeMain, newConnection);

    await newConnection.commit();
    return;
  } catch (error) {
    await newConnection.rollback();
    throw error;
  }
};

const deleteVersion = async (id) => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    await newConnection.query('UPDATE versions SET deleted = true WHERE id = ?', [id]);
    const filesVersions = getVersionsFilesByVersionId(id, newConnection);
    for (const fileVersion of filesVersions) {
      await deleteFile(fileVersion.file_id);
    }
    await newConnection.commit();
    return;
  } catch (error) {
    await newConnection.rollback();
    throw error;
  }
};


module.exports = {
  createVersion,
  updateVersion,
  deleteVersion
};
