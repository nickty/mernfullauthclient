import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Layout from '../core/Layout'
import { isAuth } from '../auth/helpers'

const Private = () => {
    const [values, setValues] = useState({
        role: '',
        name: '', 
        email: '',
        password: '',
        buttonText: 'Submit'
    })

    // useEffect(() => {
    //    loadProfile()
    // }, [])

    const { name, email, password, role } = isAuth()

    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value})
    }

    const clickSubmit = (e) => {
        e.preventDefault()

        setValues({...values, buttonText: 'Submitting'})
        
        axios({
            method: 'POST', 
            url: `${process.env.REACT_APP_API}/user/update`,
            data: { name, password}

        })
        .then(response => {
            console.log('Profile update success', response )
            setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
            toast.success(response.data)
        })
        .catch(err => {
            console.log('Profile update error', err.response.data)
            setValues({...values, buttonText: 'Submit'})
            toast.success(err.response.data.error)
        })

    }

    const updateForm = () => (
        <form onSubmit={clickSubmit}>
              <div className="form-group">
                <label for="" className="text-muted">Role</label>
                <input type="text" className="form-control" name="" value={role} />
            </div>
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

            <button type="submit" className="btn btn-primary mt-3">Update</button>
            
        </form>
    )
    return (
        <Layout>
            <ToastContainer />
            {/* {JSON.stringify({name, email, password})} */}
            <h1 className="p-5 text-center">Profile</h1>
            {updateForm()}
        </Layout>
    )
}

export default Private
