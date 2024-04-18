const { connection } = require('../../sql/connection-sql');

const getBrands = async () => {
	try {
			const [rows] = await connection.query(`SELECT * FROM brands WHERE deleted = false`);
			return rows;
	} catch (error) {
			throw error;
	}
};

const getBrand = async (id) => {
	try {
		const [rows] = await connection.query(
			`SELECT * FROM brands WHERE id = ? AND deleted = false`, [id]
		);
		if (rows.length) {
			return rows[0];
		}
		return {};
	} catch (error) {
			throw error;
	}
};

const addBrand = async (body) => {
	try {
		await connection.query(`INSERT INTO brands SET ?`, [body]);
		return;
	} catch (error) {
		throw error;
	}
};

const updateBrand = async (id, body) => {
	try {
		await connection.query(`UPDATE brands SET ? WHERE id = ?`, [body, id]);
		return;
	} catch (error) {
		throw error;
	}
}

const deleteBrand = async (id) => {
	try {
		await connection.query(`UPDATE brands SET deleted = true WHERE id = ?`, [id]);
		return;
	} catch (error) {
			throw error;
	}
};

module.exports = {
	getBrands,
	getBrand,
	addBrand,
	updateBrand,
	deleteBrand,
};
