const saveFile = async (file, conn, index = 1) => {
  try {
    const fileToSave = {
      name: file.filename,
      url: `${process.env.FILES_BASE_URL}${file.path}`,
      size: file.size,
      type: file.mimetype,
      is_main: !index 
    };
    const [createdFile] = await conn.query('INSERT INTO files SET ?', [fileToSave]);
    return createdFile.insertId;
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

module.exports = { saveFile, updateFileMainColumn, deleteFile };
