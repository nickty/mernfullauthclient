import axios from 'axios'
import React from 'react'
import FaecbookLogin from 'react-facebook-login'

const Facebook = ({informParent = f => f}) => {

    const responseFacebook = response => {
        console.log(response)

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { userID: response.userID, accessToken: response.accessToken}
        })
        .then(res => {
            console.log('Facebook signin sucess', res)
            informParent(res)
        })
        .catch(err => {
            console.log('Facebook signin error', err.response)
        })
    }
    return (
        <div className="pb-3">
            <FaecbookLogin 
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
               
            >

            </FaecbookLogin>
        </div>
    )
}

export default Facebook
