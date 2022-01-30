import React, { useContext, usestate } from 'react'
import {Context} from '../contexts/Context'
import axios from 'axios';

const Modal = () => {
    const { visibility, setVisibility, modalData, setModalData, date, email,setLoader } = useContext(Context);
    let tasks = modalData.tasks || [];
    let note = modalData.note || '';
    let url = 'https://calender-backend001.herokuapp.com/api';
    console.log(modalData);
    console.log('day', modalData.day);

    function handleAddTask () {
        let newTask = {
            title: '',
            isDone: false
        }
        setModalData({...modalData, tasks: [...tasks, newTask]});
    }

    async function handleSave () {
        setLoader('true');
        let newData = {
            user: email,
            data: {
                date: date + ' ' + modalData.day,
                value: modalData.tasks,
                note: modalData.note,
            }
        }

        // post request to server
        let savedData = await axios.post(url, newData);
        console.log(savedData);
        if (savedData.status === 200) {
            setVisibility('none');
            window.location.reload();
            // setLoader('false');
            // console.log('saved');
            // alert("Saved Successfully!!!");
        }
    }

    async function handleProcrastinate (i) {
        setLoader('true');
        let newData = {
            email: email,
            date: date + ' ' + modalData.day,
            data: modalData.tasks[i]
        }

        console.table(newData);

        // post request to server
        url+= '/procrastinate';
        let savedData = await axios.post(url, newData);
        console.table(savedData.data);
        if (savedData.status === 200) {
            setVisibility('none');
            window.location.reload();
            setLoader('false');
            // console.log('saved');
            // alert("Saved Successfully!!!");
        }
    }

    function handleCheckBox(i) {
        setModalData({
            ...modalData,
            tasks: tasks.map((task, index) => {
                if (index === i) {
                    task.isDone = !task.isDone;
                }
                return task;
            })
        })
    }

    function handleTaskInput(i, value) {
        setModalData({
            ...modalData,
            tasks: tasks.map((task, index) => {
                if (index === i) {
                    task.title = value;
                }
                return task;
            })
        })
    }

    function handleDeleteTask(i) {
        setModalData({
            ...modalData,
            tasks: tasks.filter((task, index) => index !== i)
        })
    }

    const modalContainer = React.useRef(null);
    const modalCont = modalContainer.current;
    console.log(modalCont);
    // const modal = modalContainer.current.children[0];
    if(modalCont) {
        modalCont.addEventListener('click', (e) => {
            if (e.target === modalCont) {
                console.log('modal clicked');
                setVisibility('none');
                // window.location.reload();
            } else {
                // console.log('modal not clicked');
            }
        })

    }

    return (
        <div className='modalContainer' ref = {modalContainer} style= {
            {
                display: visibility
            }
            
        }>
            <div className="modal">
                <button className="btn-fa-cross" onClick={ ()=> {
                    setVisibility('none');
                    window.location.reload();
                } }><i class="fa fa-times-circle fa-3x" aria-hidden="true"></i></button>
                <h3>Task</h3>
                {tasks.map((task, i) => {
                    return (
                        <div className='input-top'>
                            <div className='inputs' key={i}>
                                <input type="checkbox" checked={task.isDone} onChange={() => handleCheckBox(i) } />
                                <input type="text" placeholder={`Task ${i+1}`} value={task.title || " "} onChange={(e) => {handleTaskInput(i, e.target.value)}}/>
                                

                            </div>
                            <button className='btn-fa  red' onClick={() => handleDeleteTask(i)}> <i className='fa fa-trash fa-lg ic'></i> </button>
                            <button className='btn-fa  blue' onClick={() => handleProcrastinate(i)}> <i className='fa fa-forward fa-lg ic'></i> </button>
                        </div>
                    )
                })}

                <div className="textarea">
                    <h3>Note</h3>
                    <textarea value={note} placeholder="Type Note of the day..." onChange={(e) => setModalData({...modalData, note: e.target.value }) }></textarea>
                </div>
                
                <div className="buttons">
                    <button className="btn-fa-cross add blue" onClick={handleAddTask}><i className='fa fa-plus fa-2x ic'></i></button>
                    <button className="btn-fa-cross green" onClick={handleSave}><i className='fa fa-floppy-o fa-2x ic'></i></button>
                    
                </div>


            </div>
        </div>
    )
}

export default Modal
