import React from 'react'
import Cell from './Cell'

let dayNameToIndex = {
    'Sun': 0,
    'Mon': 1,
    'Tue': 2,
    'Wed': 3,
    'Thu': 4,
    'Fri': 5,
    'Sat': 6
}

const Calender = ({date, dayData }) => {
    let dataArray = [];
    for (let i = 0; i < 42; i++) {
        dataArray.push({
            date: 0,
            data:{}
        });
    }  

    let dateArray = date.toString().split(' ');
    let day = parseInt(dateArray[2]);
    let dayIndex = dayNameToIndex[dateArray[0]]+7;
    let tempDate = day;
    let tempDayIndex = dayIndex;
    function getNoOfDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    let totalDays = getNoOfDaysInMonth(date.getMonth()+1, parseInt(dateArray[3]));

    while(day>0) {
        day--;
        dayIndex--;
    }

    dayIndex = (dayIndex + 28) % 7;
    // console.log(dayIndex);

    let initialReferenceDay = parseInt(dayIndex);
    // console.log(initialReferenceDay);

    // iterate over dayData object and add to dataArray
    for (let day in dayData) {
        // console.log(day);
        dataArray[parseInt(day)+initialReferenceDay].data = dayData[day];
    }

    while(day<=totalDays) {
        // console.log(dayIndex);
        // console.log(dataArray[dayIndex].date);
        dataArray[dayIndex].date = day;
        day++;
        dayIndex++;
    }
    let dateString = dateArray[1] + ' ' + dateArray[2] + ', ' + dateArray[3];

    return (
        <div className='bottom-container'>
        
            <div className="headerRow">
                <div className="headCell"><h2>S</h2></div>
                <div className="headCell"><h2>M</h2></div>
                <div className="headCell"><h2>T</h2></div>
                <div className="headCell"><h2>W</h2></div>
                <div className="headCell"><h2>T</h2></div>
                <div className="headCell"><h2>F</h2></div>
                <div className="headCell"><h2>S</h2></div>
            </div>
            <div className="row">
                <Cell day={dataArray[0].date} data={dataArray[0].data}/>
                <Cell day={dataArray[1].date} data={dataArray[1].data}/>
                <Cell day={dataArray[2].date} data={dataArray[2].data}/>
                <Cell day={dataArray[3].date} data={dataArray[3].data}/>
                <Cell day={dataArray[4].date} data={dataArray[4].data}/>
                <Cell day={dataArray[5].date} data={dataArray[5].data}/>
                <Cell day={dataArray[6].date} data={dataArray[6].data}/>
            </div>
            <div className="row">
                <Cell day={dataArray[7].date} data={dataArray[7].data}/>
                <Cell day={dataArray[8].date} data={dataArray[8].data}/>
                <Cell day={dataArray[9].date} data={dataArray[9].data}/>
                <Cell day={dataArray[10].date} data={dataArray[10].data}/>
                <Cell day={dataArray[11].date} data={dataArray[11].data}/>
                <Cell day={dataArray[12].date} data={dataArray[12].data}/>
                <Cell day={dataArray[13].date} data={dataArray[13].data}/>
            </div>
            <div className="row">
                <Cell day={dataArray[14].date} data={dataArray[14].data}/>
                <Cell day={dataArray[15].date} data={dataArray[15].data}/>
                <Cell day={dataArray[16].date} data={dataArray[16].data}/>
                <Cell day={dataArray[17].date} data={dataArray[17].data}/>
                <Cell day={dataArray[18].date} data={dataArray[18].data}/>
                <Cell day={dataArray[19].date} data={dataArray[19].data}/>
                <Cell day={dataArray[20].date} data={dataArray[20].data}/>
            </div>
            <div className="row">
                <Cell day={dataArray[21].date} data={dataArray[21].data}/>
                <Cell day={dataArray[22].date} data={dataArray[22].data}/>
                <Cell day={dataArray[23].date} data={dataArray[23].data}/>
                <Cell day={dataArray[24].date} data={dataArray[24].data}/>
                <Cell day={dataArray[25].date} data={dataArray[25].data}/>
                <Cell day={dataArray[26].date} data={dataArray[26].data}/>
                <Cell day={dataArray[27].date} data={dataArray[27].data}/>
            </div>
            <div className="row">
                <Cell day={dataArray[28].date} data={dataArray[28].data}/>
                <Cell day={dataArray[29].date} data={dataArray[29].data}/>
                <Cell day={dataArray[30].date} data={dataArray[30].data}/>
                <Cell day={dataArray[31].date} data={dataArray[31].data}/>
                <Cell day={dataArray[32].date} data={dataArray[32].data}/>
                <Cell day={dataArray[33].date} data={dataArray[33].data}/>
                <Cell day={dataArray[34].date} data={dataArray[34].data}/>
            </div>
            <div className="row">
                <Cell day={dataArray[35].date} data={dataArray[35].data}/>
                <Cell day={dataArray[36].date} data={dataArray[36].data}/>
                <Cell day={dataArray[37].date} data={dataArray[37].data}/>
                <Cell day={dataArray[38].date} data={dataArray[38].data}/>
                <Cell day={dataArray[39].date} data={dataArray[39].data}/>
                <Cell day={dataArray[40].date} data={dataArray[40].data}/>
                <Cell day={dataArray[41].date} data={dataArray[41].data}/>
            </div>
        </div>
    )
}

export default Calender
