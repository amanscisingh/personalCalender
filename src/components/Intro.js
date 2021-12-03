import React from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Intro = () => {
    const [ email, setEmail ] = useLocalStorage('email', '')

    function handleSubmit () {
        
    }

    return (
        <div className='container'>
            <form className='form-group' onSubmit={handleSubmit}>
                <div className='form-element'>
                    <label htmlFor='email'>Email</label>
                    <input value={email} onChange={ (e)=> setEmail(e.target.value) } type='email' className='form-control' id='email' placeholder='abcd@xyz.com' />
                    <input type="submit" className='btn' value="Enter" />
                </div>
            </form>
        </div>
    )
}

export default Intro
