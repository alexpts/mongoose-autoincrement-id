"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: false,
    versionKey: false,
    read: 'pp',
};
const CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
}, schemaOptions);

module.exports = CounterSchema;