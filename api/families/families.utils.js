const { connection } = require('../../sql/connection-sql');

const getFamilybyId = async (id) => {
  const [rows] = await connection.query(`SELECT * FROM families WHERE id = ? AND deleted = false`, [id]);
  return rows[0];
};

module.exports = {
  getFamilybyId
}