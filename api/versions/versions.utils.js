const deleteVersionByGameId = async (gameId, conn) => {
  try {
    await conn.query(`UPDATE versions SET deleted = true WHERE game_id = ?`, [gameId]);
    return;
  } catch (error){
    throw error;
  }
};

module.exports = {
  deleteVersionByGameId
};