import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Layout from '../core/Layout'
import { isAuth } from './helpers'

const Signup = () => {
    const [values, setValues] = useState({
        name: '', 
        email: '',
        password: '',
        buttonText: 'Submit'
    })

    const { name, email, password, buttonText } = values

    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value})
    }

    const clickSubmit = (e) => {
        e.preventDefault()

        setValues({...values, buttonText: 'Submitting'})
        
        axios({
            method: 'POST', 
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password}

        })
        .then(response => {
            console.log('Signup success', response )
            setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
            toast.success(response.data)
        })
        .catch(err => {
            console.log('Signup Error', err.response.data)
            setValues({...values, buttonText: 'Submit'})
            toast.success(err.response.data.error)
        })

    }

    const signupForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label for="" className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" name="" value={name} />
            </div>
            <div className="form-group">
                <label for="" className="text-muted">email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" name="" value={email} />
            </div>
            
            <div className="form-group">
                <label for="" className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" name="" value={password} />
            </div>

            <button type="submit" className="btn btn-primary mt-3">{buttonText}</button>
            
        </form>
    )
    return (
        <Layout>
            <ToastContainer />
            {isAuth() ? <Redirect to="/" /> : null}
            {/* {JSON.stringify({name, email, password})} */}
            {signupForm()}
        </Layout>
    )
}

export default Signup
