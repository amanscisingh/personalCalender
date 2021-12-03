import React, {useState, useEffect } from 'react'
import Calender from './components/Calender'
import Header from './components/Header'
import Intro from './components/Intro';
import Modal from './components/Modal';
import axios from 'axios';
import {Context} from './contexts/Context';

const App = () => {
    const [visibility, setVisibility] = useState('none');
    const [modalData, setModalData] = useState({});
    const [date, setDate] = useState(new Date());
    var email = localStorage.getItem('email');
    email = JSON.parse(email);
    console.log(email);

    let dateArray = date.toString().split(' ');


    let [dayData, setDayData] = useState({});

    // api calls start
    let url = 'http://calenderbackend-env.eba-2g25ruwk.ap-south-1.elasticbeanstalk.com/api';
    async function getData() {
        const response = await axios.get(url+`?year=${parseInt(dateArray[3])}&month=${dateArray[1]}&email=${email}`);
        let data = response.data;
        console.log(data);
        let dayDataObj = {};
        for (let i = 0; i < data.length; i++) {
            dayDataObj[parseInt(data[i].data.date.split(' ')[2])] = {
                'tasks': data[i].data.value,
                'note': data[i].data.note
            };

        }
        // setDataArray2(dataArray);
        setDayData(dayDataObj);

        return dayDataObj;
    }
    
    useEffect(() => {
        getData();
    }, [date])

    // api calls end

    let isEmail;
    if(email === null){
        isEmail = false;
    }else{
        isEmail = email.includes('@');;
    }

    function nextMonth() {
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() + 1);
        setDate(newDate);
    }

    function prevMonth() {
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() - 1);
        setDate(newDate);
    }

    if (isEmail) {
        return (
            <div className="container">
                <Context.Provider value={{ visibility, setVisibility, modalData, setModalData }}>
                    <Modal />
                    <Header date={date} next={nextMonth} prev={prevMonth} />
                    <Calender date={date} dayData={dayData || {}} />
                </Context.Provider>
            </div>
        )
    } else {
        return (
            <div className="container">
                <Intro />
            </div>
        )
    }
}

export default App
