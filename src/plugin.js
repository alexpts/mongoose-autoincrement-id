"use strict";

const Factory = require('./factory.js');
const counters = Factory('counter');

counters.Factory = Factory;

module.exports = counters;
