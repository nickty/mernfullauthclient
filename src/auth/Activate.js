import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import Layout from '../core/Layout'

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: '', 
        token: '',
        show: true
    })

    useEffect(() => {
        let token = match.params.token
        // console.log(token)
        let { name } = jwt.decode(token)

        console.log(name)

        if(token) {
            setValues({...values, name, token})
        }
    }, [])

    const { name, token, show } = values

   

    const clickSubmit = (e) => {
        e.preventDefault()

        
        
        axios({
            method: 'POST', 
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: { token}

        })
        .then(response => {
            console.log('Account activation success', response )
            setValues({...values, show: false})
            toast.success(response.data.message)
        })
        .catch(err => {
            console.log('Account activation Error', err.response.data.error)
            toast.success(err.response.data.error)
        })

    }

    const activationLink = () => (
        <div>
                <h1 className="p-5 text-center">Hey {name}, Ready to activate your account</h1>
                <button className="btn btn-outline-primary" onClick={clickSubmit}>Activate Account</button>
        </div>
        

    )
 
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
               
               {activationLink()}
            </div>
          
        </Layout>
    )
}

export default Activate
