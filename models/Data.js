const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    user: {
        type: String
    },
    data: {
        date: {
            type: String,
            required: true
        },
        value: [
            {
                title: {
                    type: String,
                    required: true
                },
                isDone: {
                    type: Boolean,
                    required: true,
                    default: false
                }
            }
        ],
        note: {
            type: String,
            required: false,
            default: ''
        },
    }

    
}, {
     collections: 'calenderData',
    strict: false,
    versionKey: false
    });


module.exports = mongoose.model('calenderData', DataSchema);