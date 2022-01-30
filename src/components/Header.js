import React from 'react'
import rightArrow from '../images/right-arrow.png';
import leftArrow from '../images/left-arrow.png';
import { Context } from '../contexts/Context';

const Header = ({ date, next, prev }) => {
    const { handleSearch, setLoader, showSearch, setShowSearch } = React.useContext(Context);
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
                        placeholder="Search"
                        onChange={(e)=>{ 
                            if (e.target.value) {
                                handleSearch(e.target.value);
                                setShowSearch('show');
                                
                            } else {
                                console.log('aborted');
                                setShowSearch('');
                                
                            }
                         }} 
                        />
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
