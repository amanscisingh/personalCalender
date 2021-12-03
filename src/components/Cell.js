import React from 'react'
import {Context} from '../contexts/Context';

const Cell = ({ day=0, data }) => {
    let { setVisibility, setModalData } = React.useContext(Context);
    let watermarkData;
    if (day === 0) {
        watermarkData = " ";
    } else {
        watermarkData = day;
    }

    let tasks = data.tasks || [];
    let note = data.note || "";
    data.day = day;

    function renderBullet (isDone) {
        if (isDone) {
            return '🟢'
        } else return '🔴';
    }
    
    return (
        <div onClick={
                () => {
                    setVisibility('block')
                    setModalData(data);
                }
            } 
            className="cell"    
            data-date={'...'}
        >
            <div className="top">
                <h3>{watermarkData}</h3>
            </div>

            <div className="bottom">

                <ul>
                    {tasks.map((item, index) => {
                        return (
                            <li key={index}>
                                {renderBullet(item.isDone)} {item.title}
                            </li>
                        )
                    })}

                </ul>
                
                <p>{note}</p>
            </div>
        </div>
    )
}

export default Cell
