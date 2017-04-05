"use strict";

const mongoose = require('mongoose');
const CounterSchema = require('./schema');

module.exports = function (collectionName) {
    const Counter = mongoose.model(collectionName || 'sequence.pk', CounterSchema);

    /**
     * @param {String} name
     * @param {Number} incrementBy
     * @returns {Promise}
     */
    const seq = (name, incrementBy = 1) => {
        return Counter.findOneAndUpdate(
            {'_id': name.toLowerCase()},
            {$inc: { seq: incrementBy}},
            {new: true, upsert: true, fields: {_id: 0}}
        ).lean();
    };

    /**
     * @param {Schema} schema
     * @param {String} options.name
     */
    return function (schema, options) {
        options = options || {};

        schema.add({ _id: {
            type: Number,
            unique: true,
        }});

        schema.pre('save', async function (next) {
            if (this.isNew) {
                const nameCounter = options.name || this.collection.name;
                const incrementBy = options.inc || 1;
                const doc = await seq(nameCounter, incrementBy);
                this._id = doc.seq;
            }

            next()
        });
    };
};
