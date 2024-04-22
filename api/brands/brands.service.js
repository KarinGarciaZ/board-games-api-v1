const { connection } = require('../../sql/connection-sql');

const getBrands = async () => {
	const sqlConnection = await connection.getConnection();
	try {
		await sqlConnection.beginTransaction();
		const [brands] = await sqlConnection.query(
			`SELECT * FROM brands WHERE deleted = false`
		);

		const brandsPromises = brands.map(async brand => {
			const [games] = await sqlConnection.query(
				`SELECT * FROM games WHERE brand_id = ? AND deleted = false`, [brand.id]
			);
			return { ...brand, games };
		});
		if (brandsPromises.length) {
			const brandsToReturn = await Promise.all(brandsPromises);
			await sqlConnection.commit();
			return brandsToReturn;
		}
		return {};
	} catch (error) {
		await sqlConnection.rollback();
		throw error;
	}
};

const getBrand = async (id) => {
	const sqlConnection = await connection.getConnection();
	try {
		await sqlConnection.beginTransaction();
		const [brands] = await sqlConnection.query(
			`SELECT * FROM brands WHERE id = ? AND deleted = false`, [id]
		);
		const [games] = await sqlConnection.query(
			`SELECT * FROM games WHERE brand_id = ? AND deleted = false`, [id]
		);
		if (brands.length) {
			const brand = brands[0];
			brand.games = games;
			await sqlConnection.commit();
			return brand;
		}
		return {};
	} catch (error) {
		await sqlConnection.rollback();
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
