import React from 'react'
import { Link, withRouter} from 'react-router-dom'
import { isAuth, signout } from '../auth/helpers'

const Layout = ({children, match, history}) => {

    const isActive = path => {
        if(match.path === path){
            return {color: '#000'}
        } else 
        {
            return { color: '#fff'}
        }
    }
    const nav = () => {
        return (<ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}>
                    Home
                </Link>
            </li>


           { !isAuth() && (
               <>
               <li className="nav-item">
                    <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                        Signin
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                        Signup
                    </Link>
                </li>
               </>
           )}

            { isAuth() && isAuth().role === 'admin' && (
             
                <li className="nav-item">
                  <Link style={isActive('/admin')} className="nav-link" to='/admin'>{isAuth().name}</Link>
                </li>
            
           )}

            { isAuth() && isAuth().role === 'subscriber' && (
             
                <li className="nav-item">
                  <Link style={isActive('/private')} className="nav-link" to='/private'>{isAuth().name}</Link>
                </li>
            
           )}

           
           { isAuth() && (
             
                <li className="nav-item">
                   <span style={{ cursor: 'pointer', color: 'white'}} className="nav-link" onClick={()=>{signout(() => { history.push('/')})}}>Signout</span>
                </li>
            
           )}
            
        </ul>)
    }
    return (
        <>
            {nav()}
        <div className="container">
            {children}
        </div>
            
        </>
    )
}

export default withRouter(Layout)
