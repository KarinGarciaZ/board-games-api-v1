const { connection } = require('../../sql/connection-sql');

const getBrandById = async (brandId) => {
	try {
		const [brands] = await connection.query(
			`SELECT * FROM brands WHERE id = ? AND deleted = false`, [brandId]
		);
		return brands[0];
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getBrandById
};
