const db = require('../../data/db-config');

module.exports = {
  getAll,
  getById,
  create
}

const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars').where('id', id).first();
}

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  return getById(id);
}
