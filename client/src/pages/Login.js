import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const lottieURL = 'https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json';
    const loginSubmit = () => {

    }
    return (
        <div className='row bgcolor py-4 align-items-center justify-content-evenly'>
            <h2 className='text-white text-center'> Ay! Captain Welcome Back. </h2>
            <div className='col-md-6'>
                <div className='flex justify-center w-75 h-75'>
                    <lottie-player src={lottieURL} background="transparent" speed="1" autoplay></lottie-player>
                </div>
            </div>
            <div className='col-md-4 py-5 mt-3'>
                <div className="card p-3 bg-white">
                    <h2>login</h2>
                    <form onSubmit={loginSubmit}>
                        <div className='form-group m-2'>
                            <h5>Email Address</h5>
                            <input autoFocus type="email" className='form-control' placeholder='enter mail' required />
                        </div>
                        <div className='form-group m-2'>
                            <h5>Password</h5>
                            <input type="password" className='form-control' placeholder='enter password' required />
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='m-5 submit-btn'>Submit</button>
                        </div>
                    </form>
                    <Link className='text-primary text-center my-3' to="/register">Not Registered? Click here</Link>
                </div>
            </div>
        </div>
    )
}

export default Login