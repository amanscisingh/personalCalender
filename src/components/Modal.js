import React, { useContext, usestate } from 'react'
import {Context} from '../contexts/Context'
import axios from 'axios';

const Modal = () => {
    const { visibility, setVisibility, modalData, setModalData, date, email } = useContext(Context);
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
            alert("Saved Successfully!!!");
            window.location.reload();

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

    return (
        <div className='modalContainer' style= {
            {
                display: visibility
            }
        }>
            <div className="modal">
                <h3>Task</h3>
                {tasks.map((task, i) => {
                    console.log(task._id);
                    return (
                        <div className='inputs' key={i}>
                            <input type="checkbox" checked={task.isDone} onChange={() => handleCheckBox(i) } />
                            <input type="text" placeholder={`Task ${i+1}`} value={task.title} onChange={(e) => {handleTaskInput(i, e.target.value)}}/>
                            <button onClick={() => handleDeleteTask(i)}>🗑️</button>
                        </div>
                    )
                })}

                <h3>Note</h3>
                <textarea value={note} placeholder="Type Note of the day..." onChange={(e) => setModalData({...modalData, note: e.target.value }) }></textarea>
                
                <div className="buttons">
                    <button className="btn" onClick={handleAddTask}>Add Task</button>
                    <button className="btn" onClick={handleSave}>Save</button>
                    <button className="btn" onClick={ ()=> {
                        setVisibility('none')
                    } }>Close</button>
                </div>


            </div>
        </div>
    )
}

export default Modal