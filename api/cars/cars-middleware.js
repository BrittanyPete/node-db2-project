const Cars = require('./cars-model');

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}


const checkCarId = (req, res, next) => {
  try {
    const carId = await Cars.getById(req.params.id);
    if (!carId) {
      res.status(404).json({
        message: `car with id ${carId} is not found`
      })
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
  }
}

const checkVinNumberValid = (req, res, next) => {
  try {
    const {vin} = req.body.vin
    if (vin.length !== 17) {
      res.status(400).json({ message: `vin ${vin} is invalid`})
    }
  }
  catch (err) {
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body.vin;
  try {
    const exists = await db('cars')
    .where('vin', vin.trim())
    .first()

    if(exists) {
      res.status(400).json({ message: `vin ${vin} already exists`})
    }
  }
  catch (err) {
    next(err)
  }
}
