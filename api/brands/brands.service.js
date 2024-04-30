const { connection } = require('../../sql/connection-sql');
const { deleteExtensionByGameId } = require('../extensions/extensions.utils');
const { deleteVersionByGameId } = require('../versions/versions.utils');
const { getGamesByBrandId } = require('../games/games.utils');
const { getBrandById } = require('./brands.utils');
const Brand = require('../../sql/models/brand');

const getBrands = async () => {
	try {
		const [brands] = await connection.query(
			`SELECT * FROM brands WHERE deleted = false`
		);

		const brandsPromises = brands.map(async brand => {
			const games = await getGamesByBrandId(brand.id);
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

const getBrand = async (brandId) => {
	try {
		const brand = await getBrandById(brandId);
		const games = await getGamesByBrandId(brandId);
		if (brand) {
			return {...brand, games};
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
		const games = await getGamesByBrandId(id);
		await sqlConnection.query(`UPDATE games SET deleted = true WHERE brand_id = ?`, [id]);
		for (const game of games) {
			await deleteVersionByGameId(game.id, sqlConnection);
			await deleteExtensionByGameId(game.id, sqlConnection);
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
	deleteBrand
};
