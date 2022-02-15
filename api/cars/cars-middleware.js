const Cars = require('./cars-model');
const db = require('../../data/db-config');

const checkCarId = async (req, res, next) => {
  try {
    const carId = await Cars.getById(req.params.id);
    if (!carId) {
      res.status(404).json({
        message: `car with id ${carId} is not found`
      })
    } else {
      req.carId = carId;
      next();
    }
  }
  catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if(!vin) {
    res.status(400).json({ message: 'vin is missing'})
  } else if (!make) {
    res.status(400).json({ message: 'make is missing'})
  } else if (!model) {
    res.status(400).json({ message: 'model is missing'})
  } else if (!mileage) {
    res.status(400).json({ message: 'mileage is missing'})
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // const {vin} = req.body.vin
  try {
      if (req.body.vin.length !== 17) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid`})
    } else {
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await db('cars')
    .where('vin', req.body.vin)
    .first()

    if(exists) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists`})
    } else {
      next()
    }
  }
  catch (err) {
    res.status(500).json({message: 'unable to verify uniqueness'})
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}