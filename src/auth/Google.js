import axios from 'axios'
import React from 'react'
import GoogleLogin from 'react-google-login'

const Google = ({informParent = f => f}) => {

    const responseGoogle = response => {
        console.log(response.tokenId)

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: { idToken: response.tokenId}
        })
        .then(res => {
            console.log('Google signin sucess', res)
            informParent(res)
        })
        .catch(err => {
            console.log('Google signin error', err.response)
        })
    }
    return (
        <div className="pb-3">
            <GoogleLogin 
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            >

            </GoogleLogin>
        </div>
    )
}

export default Google
