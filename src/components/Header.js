import React from 'react'
import rightArrow from '../images/right-arrow.png';
import leftArrow from '../images/left-arrow.png';

const Header = ({ date, next, prev }) => {
    let dateArray = date.toString().split(' ');
    console.log(dateArray);
    let dateString = dateArray[1] + ', ' + dateArray[3];
    return (
        <div className='top-container'>
            <button className='btn' onClick={prev}> <img src={leftArrow} /> </button>
            <h1>{dateString}</h1>
            <button className='btn' onClick={next}> <img src={rightArrow} /> </button>
        </div>
    )
}

export default Header
