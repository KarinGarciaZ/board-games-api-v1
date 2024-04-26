const saveFile = async (file, index, conn) => {
  try {
    const fileToSave = {
      name: file.filename,
      url: `/Users/oscargarcia/Documents/estudio-node/games-api-v1/${file.path}`,
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

module.exports = { saveFile };
