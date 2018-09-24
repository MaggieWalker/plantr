const express = require('express')
const Sequelize = require('sequelize');
const db = require('./models')

const {
    Vegetable: Vegetable,
    Gardener: Gardener,
    Plot: Plot
} = db.models


db.sync({force: true})
.then(() => {
    console.log('It synced!!!')

})
.catch((err) => {
    console.log(`It is broken: ${err}`)
})
.finally(()=> {
    db.close();
})

//Adding vegetables in parallel! 
const eggplant = Vegetable.create({name: 'eggplant', color: 'purple', planted_on: '2018-08-10'});
const gourd = Vegetable.create({name: 'gourd', color: 'yellow', planted_on: '2018-10-24'});
const asparagus = Vegetable.create({name: 'asparagus', color: 'green', planted_on: '2018-10-24'});
const pepper = Vegetable.create({name: 'pepper', color: 'red', planted_on: '2018-09-24'});

Promise.all([eggplant, gourd, asparagus, pepper])
.catch((err) => {
    console.log(err)
})

// const PlotVegetable = db.model('plot_vegetable');


Gardener.create({name: 'Fletcher', age: 33, favoriteVegatableId: 1})
.then((gardener) => {
    return Plot.create({gardenerId: gardener.id})
})