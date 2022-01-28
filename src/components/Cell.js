import React from 'react'
import {Context} from '../contexts/Context';

const Cell = ({ day=0, data }) => {
    let { setVisibility, setModalData } = React.useContext(Context);
    let watermarkData; let pointerData; let isClickable=false;
    if (day === 0) {
        watermarkData = " ";
        pointerData = "not-allowed";
    } else {
        watermarkData = day;
        pointerData = "pointer";
        isClickable = true;
    }

    let tasks = data.tasks || [];
    let note = data.note || "";
    data.day = day;

    function renderBullet (isDone) {
        if (isDone) {
            return '🟢'
        } else return '🔴';
    }

    const classText = (new Date().getDate() === day) ? 'cell today' : 'cell';
    
    return (
        <div onClick={
                () => {
                    if (isClickable) {
                        setVisibility('block')
                        setModalData(data);
                    } else {
                        return;
                    }
                }
            } 
            style={{
                cursor: pointerData,
            }}
            className={classText}    
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
