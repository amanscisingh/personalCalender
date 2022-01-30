import React, { useContext, usestate } from 'react'
import {Context} from '../contexts/Context'
import axios from 'axios';
import { Container } from 'react-bootstrap';

const Modal = () => {
    const { visibility, setVisibility, searchKey, setSearchKey, email, setLoader } = useContext(Context);
    const [searchData, setSearchData] = useState([]);
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

    const response = await axios.get(url+`?year=${parseInt(dateArray[3])}&month=${dateArray[1]}&email=${email}`);
        let data = response.data;
        console.log(data);

    async function handleSearch (input) {
        setSearchKey(input);
        
        // get request to server
        const response = await axios.get(url+`?key=${input}&email=${email}`);
        let data = response.data;
        console.log(data);

        if (data.status === 200) {
            setLoader('false');
            setSearchData([]);
            // console.log('saved');
            // alert("Saved Successfully!!!");
        }
    }

    const modalContainer = React.useRef(null);
    // const modalCont = modalContainer.current;
    // console.log(modalCont);
    // // const modal = modalContainer.current.children[0];
    // if(modalCont) {
    //     modalCont.addEventListener('click', (e) => {
    //         if (e.target === modalCont) {
    //             console.log('modal clicked');
    //             setVisibility('none');
    //             window.location.reload();
    //         } else {
    //             // console.log('modal not clicked');
    //         }
    //     })

    // }

    return (
        <div className="search-results">
            
        </div>
    )
}

export default Modal
