const formatFile = (file, index) => {
  try {
    const fileToSave = {
      name: file.filename,
      url: `${process.env.FILES_BASE_URL}${file.path}`,
      sie: file.size,
      type: file.mimetype,
      is_ain: !index 
    };
    return fileToSave;
  } catch (error) {
    throw error;
  }
};

const deleteFile = async (fileId, conn) => {
  try {
    await conn.query('UPDATE files SET deleted = true WHERE id = ?', [fileId]);
    return;
  } catch (error) {
    throw error;
  }
};

const updateFileMainColumn = async (value, fileId, conn) => {
  try {
    await conn.query('UPDATE files SET is_main = ? WHERE id = ?', [value, fileId]);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = { formatFile, updateFileMainColumn, deleteFile };
