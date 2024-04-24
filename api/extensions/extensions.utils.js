const deleteExtensionByGameId = async (gameId, conn) => {
  try {
    await conn.query(`UPDATE extensions SET deleted = true WHERE game_id = ?`, [gameId]);
    return;
  } catch (error){
    throw error;
  }
};

module.exports = {
  deleteExtensionByGameId
}