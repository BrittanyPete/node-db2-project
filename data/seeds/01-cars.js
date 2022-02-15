// STRETCH
exports.seed = async function(knex) {
    await knex('cars').truncate()
    return knex('cars').insert([
        {vin: '1234567890abcdfeg', make: 'Honda', model: 'Accord', mileage: 297100, title: 'clean', transmission: 'manual'},
        {vin: '1235567890abcdfeg', make: 'Ford', model: 'Focus', mileage: 97000, title: 'salvaged', transmission: 'automatic'},
        {vin: '1236567890abcdfeg', make: 'Jeep', model: 'Cherokee', mileage: 76012, title: 'clean', transmission: 'automatic'},
        {vin: '1237567890abcdfeg', make: 'Toyota', model: 'Tacoma', mileage: 23852, title: 'clean', transmission: 'manual'},
        {vin: '1238567890abcdfeg', make: 'Nissan', model: 'Altima', mileage: 136442, title: 'salvaged', transmission: 'automatic'},
    ])
}