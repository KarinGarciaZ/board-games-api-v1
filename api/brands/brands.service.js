const { connection } = require('../../sql/connection-sql');
const ExtensionsService = require('../extensions/extensions.service');
const VersionsService = require('../versions/versions.service');

const getBrands = async () => {
	try {
		const [brands] = await connection.query(
			`SELECT * FROM brands WHERE deleted = false`
		);

		const brandsPromises = brands.map(async brand => {
			const [games] = await connection.query(
				`SELECT * FROM games WHERE brand_id = ? AND deleted = false`, [brand.id]
			);
			return { ...brand, games };
		});
		if (brandsPromises.length) {
			const brandsToReturn = await Promise.all(brandsPromises);
			return brandsToReturn;
		}
		return [];
	} catch (error) {
		throw error;
	}
};

const getBrand = async (id) => {
	try {
		const [brands] = await connection.query(
			`SELECT * FROM brands WHERE id = ? AND deleted = false`, [id]
		);
		const [games] = await connection.query(
			`SELECT * FROM games WHERE brand_id = ? AND deleted = false`, [id]
		);
		if (brands.length) {
			const brand = brands[0];
			brand.games = games;
			return brand;
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
	const sqlConnection = await connection.getConnection();
	try {
		await sqlConnection.beginTransaction();
		await sqlConnection.query(`UPDATE brands SET deleted = true WHERE id = ?`, [id]);
		const [games] = await sqlConnection.query(`SELECT id from games WHERE brand_id = ? AND deleted = false`, [id]);
		await sqlConnection.query(`UPDATE games SET deleted = true WHERE brand_id = ?`, [id]);
		for (const game of games) {
			await VersionsService.deleteVersionByGameId(game.id, sqlConnection);
			await ExtensionsService.deleteExtensionByGameId(game.id, sqlConnection);
		}
		await sqlConnection.commit();
		return;
	} catch (error) {
		await sqlConnection.rollback();
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
