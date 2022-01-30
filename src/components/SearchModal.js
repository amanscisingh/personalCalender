import React, { useContext, usestate } from 'react'
import {Context} from '../contexts/Context'
const SearchModal = () => {
    const { searchData, showSearch, email, setLoader } = useContext(Context);
    console.log(showSearch);
    function renderBullet (isDone) {
        if (isDone) {
            return '🟢'
        } else return '🔴';
    }

    if (searchData.length > 0) {
        return (
            <div className={showSearch + ' search-results'}>
                { searchData.map((item, index) => {
                    return (
                        <div className="search-result" key={index}>
                            <div className="search-result-isDone">
                                {renderBullet(item.isDone)}
                            </div>
                            <div className="search-result-title">
                                {item.title}
                            </div>
                            <div className="search-result-date">
                                {item.date}
                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    } else {
           return (
            <div className={showSearch + ' search-results'}>
                <div className="search-result center">
                    
                    <div className="search-result-title">
                        No results found!
                    </div>
                   
                </div>
            </div>
        )
    }
}

export default SearchModal
