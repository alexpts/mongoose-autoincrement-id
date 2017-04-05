"use strict";

const Factory = require('./factory.js');
const counters = Factory();

counters.Factory = Factory;

module.exports = counters;
