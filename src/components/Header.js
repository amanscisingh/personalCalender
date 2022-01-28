import React from 'react'
import rightArrow from '../images/right-arrow.png';
import leftArrow from '../images/left-arrow.png';

const Header = ({ date, next, prev }) => {
    let dateArray = date.toString().split(' ');
    console.log(dateArray);
    let dateString = dateArray[1] + ', ' + dateArray[3];
    return (
        <div className='top-container'>
            <div className="top">
                {/* <input className='globalSearchBar' type="search" name="globalSearch" id="globalSearch" /> */}
                <div class="input-icons">
                    <i class="fa fa-search icon">
                </i>
                    <input class="input-field" 
                        type="search" 
                        placeholder="Search" />
                </div>

            </div>

            <div className="bottom">
                <button className='btn' onClick={prev}> <img src={leftArrow} /> </button>
                <h1>{dateString}</h1>
                <button className='btn' onClick={next}> <img src={rightArrow} /> </button>

            </div>
        </div>
    )
}

export default Header
