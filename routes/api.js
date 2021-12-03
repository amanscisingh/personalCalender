const express = require('express');
const apiRouter = express.Router();

const calenderData = require('../models/Data');

apiRouter.get('/', async (req, res) => {
    try {
        let { year, month, email } = req.query;
        console.log(year, month, email);
        let data;
        if (year && month && email) {
            data = await calenderData.find({ "user": email , "data.date": {"$regex": `${year} ${month}`, "$options": "i"} });
        } else {
            data = await calenderData.find({});
        }

        console.log(data);
        res.json(data);
    } catch (error) {
        console.log(error);
        
    }
})

apiRouter.post('/', async (req, res) => {
    try {
        let { user, data: {date, value, note} } = req.body;
        let findData = await calenderData.findOne({ "$and": [{"user": user}, { "data.date": date } ] });
        console.log(findData);
        let savedData;
        if (findData !== null) {
            console.log('findData', findData);
            savedData = await calenderData.findOneAndUpdate({ "$and": [{"user": user}, { "data.date": date } ] }, { user, data: {date, value, note} }, { new: true });
        } else {
            let newData = new calenderData({ user, data: {date, value, note} });
            savedData = await newData.save();
        }
        res.json(savedData);

    } catch (error) {
        console.log(error);
        
    }
})

apiRouter.put('/', async (req, res) => {
    try {
        let { user, data: {date, value, note} } = req.body;
        let updatedData = await calenderData.findOneAndUpdate({ "$and": [{"user": user}, { "data.date": date } ] }, { user, data: {date, value, note} }, { new: true });

        res.json(updatedData);

    } catch (error) {
        console.log(error);
        
    }
})

apiRouter.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let deletedData = await calenderData.findByIdAndDelete(id);
        res.json(deletedData);
    } catch (error) {
        console.log(error);
        
    }
})

module.exports = apiRouter;