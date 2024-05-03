const { deleteExtensionsByGameId } = require('../extensions/extensions.utils');
const { deleteVersionsByGameId } = require('../versions/versions.utils');
const { getGamesByBrandId } = require('../games/games.utils');
const Brand = require('../../sql/models/brand');
const Game = require('../../sql/models/game');
const { sequelize } = require('../../sql/sequelize-connection');

const getBrands = async () => {
	try {
		const brands = await Brand.findAll({
			where: {
				deleted: false
			},
			include: [
				{
					model: Game,
					where: {
						deleted: false
					},
					required: false,
				},
			]
		});
		return brands;
	} catch (error) {
		throw error;
	}
};

const getBrand = async (brandId) => {
	try {
		const brand = await Brand.findOne({
			where: {
				id: brandId,
				deleted: false
			},
			include: {
				model: Game,
				where: {
					deleted: false
				},
				required: false,
			}
		});
		return brand ? brand : {};
	} catch (error) {
		throw error;
	}
};

const addBrand = async (brand) => {
	try {
		await Brand.create(brand);
		return;
	} catch (error) {
		throw error;
	}
};

const updateBrand = async (brandId, brand) => {
	try {
		await Brand.update(brand, {
			where: {
				id: brandId
			}
		})
		return;
	} catch (error) {
		throw error;
	}
}

const deleteBrand = async (brandId) => {
	const t = await sequelize.transaction();
	try {
		await Brand.update(
			{ deleted: true },
			{
				where: {
					id: brandId
				},
				transaction: t
			}
		);
		const games = await getGamesByBrandId(brandId);
		for (const game of games) {
			await deleteVersionsByGameId(game.id, t);
			await deleteExtensionsByGameId(game.id, t);
		};
		await Game.update(
			{ deleted: true },
			{
				where: {
					brandId
				},
				transaction: t
			}
		);
		await t.commit();
		return;
	} catch (error) {
		await t.rollback();
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
