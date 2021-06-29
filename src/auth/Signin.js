import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Layout from '../core/Layout'
import { authenticate, isAuth } from './helpers'
import Google from './Google'
import Facebook from './Facebook'

const Signin = ({history}) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Signin'
    })

    const { email, password, buttonText } = values

    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value})
    }

    const informParent = response =>{
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault()

        setValues({...values, buttonText: 'Signing in'})
        
        axios({
            method: 'POST', 
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password}

        })
        .then(response => {
            console.log('Signup success', response )

            //save the response (user, token) localstorage/cookie
            authenticate(response, () => {
                setValues({...values, email: '', password: '', buttonText: 'Submitted'})
                // toast.success(`Hey ${response.data.user.name}, Welcome back!`)

                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
            })

            
        })
        .catch(err => {
            console.log('Signin Error')
            setValues({...values, buttonText: 'Signin'})
            toast.success(err.response)
        })

    }

    const signupForm = () => (
        <form onSubmit={clickSubmit}>
            
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
            {/* {JSON.stringify(isAuth())} */}
            <ToastContainer />
            <Google informParent={informParent} />
            <Facebook informParent={informParent} />
            {isAuth() ? <Redirect to="/" /> : null}
            {/* {JSON.stringify({email, password})} */}
            {signupForm()}
        </Layout>
    )
}

export default Signin
