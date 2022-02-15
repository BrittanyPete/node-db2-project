const Cars = require('./cars-model');
const router = require('express').Router();

const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware');

router.get('/', (req, res, next) => {
    Cars.getAll()
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        next({status: 500, message: 'could not get cars'})
    })
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.json(req.carId);
})

router.post('/', 
    checkCarPayload, 
    checkVinNumberUnique, 
    checkVinNumberValid, 
    async (req, res, next) => {
    try {
        const carData = await Cars.create(req.body)
        res.status(201).json(carData)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;