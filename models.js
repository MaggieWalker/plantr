const express = require('express')
const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/plantr');

const Gardener = db.define('gardener', {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
  })

const Plot = db.define('plot', {
    shaded: Sequelize.BOOLEAN,
    size: Sequelize.INTEGER,
  })

const Vegetable = db.define('vegetable', {
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    planted_on: Sequelize.DATE
  })

Plot.belongsTo(Gardener)
Gardener.hasOne(Plot)

Vegetable.belongsToMany(Plot, {through: 'harvest'});
Plot.belongsToMany(Vegetable, {through: 'harvest'});

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});


module.exports = db, Vegetable, Gardener, Plot;