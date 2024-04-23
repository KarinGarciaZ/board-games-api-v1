const { connection } = require('../../sql/connection-sql');

const getFamilies = async () => {
  try {
    const [rows] = await connection.query(`SELECT * FROM families WHERE deleted = false`);
    const newFamilies = rows.map(async (row) => {
        const familyId = row.id;
        const [gamesRows] = await connection.query(`SELECT * FROM games WHERE family_id = ? AND deleted = false`, [familyId]);
        return {
          ...row,
          games: gamesRows
        }
    });
    const families = await Promise.all(newFamilies);
    return families;
  } catch (error) {
    throw error;
  }
};

const getFamily = async (id) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM families WHERE id = ? AND deleted = false`, [id]);
    const [gamesRows] = await connection.query(`SELECT * FROM games WHERE family_id = ? AND deleted = false`, [id]);
    if (rows.length) {
      return {
        ...rows[0],
        games: gamesRows
      };
    }
    return {};
  } catch (error) {
    throw error;
  }
};

const addFamily = async (body) => {
  try {
    const [row] = await connection.query(`INSERT INTO families SET ?`, [body]);
    return row;
  } catch (error) {
    throw error;
  }
}

const updateFamily = async (id, body) => {
  try {
    await connection.query(`UPDATE families SET ? WHERE id = ?`, [body, id]);
    return;
  } catch (error) {
    throw error;
  }
};

const deleteFamily = async (id) => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    await newConnection.query(`UPDATE families SET deleted = true WHERE id = ?`, [id]);
    const [gamesRows] = await newConnection.query(`SELECT id FROM games WHERE family_id = ? AND deleted = false`, [id]);
    for (const game of gamesRows) {
      await newConnection.query(`UPDATE versions SET deleted = true WHERE game_id = ?`, [game.id]);
      await newConnection.query(`UPDATE extensions SET deleted = true WHERE game_id = ?`, [game.id]);
    };
    await newConnection.query(`UPDATE games SET deleted = true WHERE family_id = ?`, [id]);
    await newConnection.commit();
  } catch (error) {
    await newConnection.rollback();
    throw error;
  }
  await newConnection.end();
  return;
};

module.exports = {
  getFamilies,
  getFamily,
  updateFamily,
  addFamily,
  deleteFamily
}