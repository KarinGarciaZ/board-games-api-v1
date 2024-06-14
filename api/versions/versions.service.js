const { formatFile } = require('../files/files.utils');
const { sequelize } = require('../../sql/sequelize-connection');
const { Version, Extension, File } = require('../../sql/models');

const createVersion = async (version, files) => {
  const t = await sequelize.transaction();
  try {
    const filesToSave = files.map(formatFile);
    await Version.create({
      ...version,
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

const updateVersion = async (id, version, imagesToDelete, mainImageId, files) => {
  const t = await sequelize.transaction();
  try {
    if (mainImageId || files.length) {
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
  
      const versionToSave = await Version.findOne({
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
  
      const fileIds = versionToSave.files.map( file => file.id );
  
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

      if (filesToSave.length) {
        const createdFiles = await File.bulkCreate(
          [ ...filesToSave ],
          { transaction: t }
        );
    
        await versionToSave.addFiles(createdFiles, { transaction: t });
      }
    }
    
    await Version.update(
      { ...version },
      {
        where: { id },
        transaction: t
      }
    );

    await t.commit();
    return;
  } catch (error) {
    await t.rollback();
    throw error
  }
};

const deleteVersion = async (id) => {
  const t = await sequelize.transaction();
  try {
    await Version.update({ deleted: true }, {
      where: {
        id,
      },
      transaction: t
    });

    await Extension.update(
      { deleted: true },
      { where: { versionId: id }}
    );

    await t.commit();
    return;
  } catch (error) {
    await t.rollback();
    throw error
  }
};


module.exports = {
  createVersion,
  updateVersion,
  deleteVersion
};
