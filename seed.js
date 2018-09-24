const express = require('express')
const Sequelize = require('sequelize');

const db = require('./models')

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