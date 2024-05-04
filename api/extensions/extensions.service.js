const { connection } = require('../../sql/connection-sql');
const { formatFile, deleteFile, updateFileMainColumn } = require('../files/files.utils');
const { getExtensionFilesByExtensionId } = require('./extensions.utils');
const { sequelize } = require('../../sql/sequelize-connection');
const { File, Extension } = require('../../sql/models');

const getExtension = async (id) => {
  try {
    const extension = await Extension.findOne({
      where: {
        id,
        deleted: false
      },
      include: [
        {
          model: File,
          required: false,
          where: { deleted: false }
        }
      ]
    });

    return extension ?? {};
  } catch (error) {
    throw error;
  }
};

const addExtension = async (body, files) => {
  const t = await sequelize.transaction();
  try {
    const filesToSave = files.map(formatFile);
    await Extension.create({
      ...body,
      files: filesToSave
    },{
      include: File,
      transaction: t
    });
    await t.commit();
    return;
  } catch (error) {
    await t.rollback();
    throw error
  }
};

const updateExtension = async (id, extension, imagesToDelete, mainImage, files) => {
  const newConnection = await connection.getConnection();
  try {
    newConnection.beginTransaction();
    let firstNewFileId;
    if (files.length) {
      const filesIds = await Promise.all(files.map(async (file, index) => {
        const id = await saveFile(file, newConnection, index);
        return id;
      }));
      const extensionFile = { extensions_id: id }
      for (const fileId of filesIds) {
        extensionFile.file_id = fileId;
        await newConnection.query(`INSERT INTO extensions_files SET ?`, [extensionFile]);
      }
      firstNewFileId = filesIds[0];
    };
    const extensionFiles = await getExtensionFilesByExtensionId(id, newConnection);

    for (const extensionFile of extensionFiles) {
      updateFileMainColumn(false, extensionFile.file_id, newConnection);
    };
    if  (mainImage) {
      await updateFileMainColumn(true, mainImage, newConnection);
    }  else {
      await updateFileMainColumn(true, firstNewFileId, newConnection);
    };

    if (imagesToDelete) {
      for (const image of imagesToDelete ) {
        await deleteFile(image, newConnection);
      }
    };

    await newConnection.query(`UPDATE extensions SET ? WHERE id = ?`, [extension, id]);
    await newConnection.commit();
    return;
  } catch (error){
    await newConnection.rollback();
    throw error
  }
};

const deleteExtension = async (id) => {
  const newConnection = await connection.getConnection();
  try {
    newConnection.beginTransaction();
    const [filesIds] = await newConnection.query(`SELECT file_id from extensions_files WHERE extension_id = ?`, [id]);
    for (const fileId of filesIds) {
      await newConnection.query(`UPDATE files SET deleted = true WHERE id = ?`, [fileId.file_id]);
    }
    await newConnection.query(`UPDATE extensions SET deleted = true WHERE id = ?`, [id]);
    newConnection.commit();
    return;
  } catch (error) {
    newConnection.rollback();
    throw (error)
  }
}

module.exports = {
  getExtension,
  addExtension,
  updateExtension,
  deleteExtension,
}