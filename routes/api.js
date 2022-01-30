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


apiRouter.get('/search', async (req, res) => {
    try {
        let { email, keyword } = req.query;
        console.log(email, keyword);
        // seach by email and keyword regex
        let data = await calenderData.find({ "user": email, "data.value.title" : {"$regex": keyword, "$options": "i"} });
        let formattedData = [];

        if (data.length > 0) {
            data.forEach(element => {
                element.data.value.forEach(item => {
                    if (item.title.toLowerCase().includes(keyword.toLowerCase())) {
                        formattedData.push({
                            date: element.data.date,
                            title: item.title,
                            isDone: item.isDone,
                            _id: item._id,
                        });
                    }
                });
            });
        }

        res.json(formattedData);

    } catch (error) {
        res.json(error);
    }
})

apiRouter.post('/procrastinate', async (req, res) => {
    try {
        let {email, data, date} = req.body;
        let findData = await calenderData.findOne({ "$and": [{"user": email}, { "data.date": date } ] });
        findData.data.value = findData.data.value.filter(item => {
            return item._id != data._id;
        });

        // remove _id from data
        delete data._id;
        await calenderData.findByIdAndUpdate(findData._id, { data: findData.data }, { new: true });

        // find a date next to date
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 2);
        newDate = newDate.toUTCString().split(',')[1].split(' ')[3] + " " + newDate.toUTCString().split(',')[1].split(' ')[2] + " " + parseInt(newDate.toUTCString().split(',')[1].split(' ')[1]).toString(); 
        console.log(newDate);

        let findData2 = await calenderData.findOne({ "$and": [{"user": email}, { "data.date": newDate } ] });
        console.log(findData2);
        if(findData2) {
            findData2.data.value.push(data);
            await calenderData.findByIdAndUpdate(findData2._id, { data: findData2.data }, { new: true });
        } else {
            console.log('new data');
            let newData = new calenderData({ user: email, data: {date: newDate, value: [data]} });
            await newData.save();
        }

        res.json(findData2);

        
    } catch (error) {
        console.log(error);
        
    }
})

module.exports = apiRouter;