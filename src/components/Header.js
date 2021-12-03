import React from 'react'

const Header = ({ date, next, prev }) => {
    let dateArray = date.toString().split(' ');
    console.log(dateArray);
    let dateString = dateArray[1] + ' ' + dateArray[2] + ', ' + dateArray[3];
    return (
        <div className='top-container'>
            <button className='btn' onClick={prev}>Prev</button>
            <h1>{dateString}</h1>
            <button className='btn' onClick={next}>Next</button>
        </div>
    )
}

export default Header
