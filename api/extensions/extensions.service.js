const { formatFile } = require('../files/files.utils');
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

const updateExtension = async (id, extension, imagesToDelete, mainImageId, files) => {
  if (!mainImageId && !files.length) throw 'Bad request';
  const t = await sequelize.transaction();
  try {
    const filesToSave = files.map(formatFile);

    if (imagesToDelete && imagesToDelete.length) {
      await File.update(
        { deleted: true },
        {
          where: {
            id: [...imagesToDelete]
          },
          transaction: t
        }
      );
    }

    const extensionToSave = await Extension.findOne({
      where: { id, deleted: false },
      include: [
        {
          model: File,
          where: { deleted: false },
          required: false,
        }
      ],
      transaction: t
    })

    const fileIds = extensionToSave.files.map( file => file.id );

    await File.update(
      { is_main: false },
      {
        where: {
          id: fileIds,
          is_main: true
        },
        transaction: t
      }
    );

    if (mainImageId) {
      await File.update(
        { is_main: true },
        {
          where: {
            id: mainImageId
          },
          transaction: t
        }
      );
      if (filesToSave[0]) {
        filesToSave[0].is_main = false;
      }
    }

    await Extension.update(
      { ...extension },
      {
        where: { id },
        transaction: t
      }
    );

    const createdFiles = await File.bulkCreate(
      [ ...filesToSave ],
      {
        include: { model: Extension, where: { id } },
        transaction: t
      }
    );

    await extensionToSave.addFiles(createdFiles, { transaction: t });

    await t.commit();
    return;
  } catch (error) {
    await t.rollback();
    throw error
  }
};

const deleteExtension = async (id) => {
  try {
    const extension = await Extension.update({ deleted: true }, {
      where: {
        id,
      },
    });

    return extension ?? {};
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getExtension,
  addExtension,
  updateExtension,
  deleteExtension,
}