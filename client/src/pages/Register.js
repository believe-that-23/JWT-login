import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Register() {
    const lottieURL = 'https://assets5.lottiefiles.com/packages/lf20_2jczmi5y.json';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const registerSubmit = async (data) => {
        if (data.password === data.cpassword) {
            const userData = {
                user: data.user,
                email: data.email,
                password: data.password
            }

            await axios.post('auth/register', userData)
                .then(log => {
                    if (log.data.success) {
                        toast.success(log.data.msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else {
                        toast.error(log.data.msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });

        } else {
            toast.error('password don\'t match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className='row bgcolor p-2 align-items-center justify-content-evenly'>
            <h2 className='text-white text-center'>Ay! Captain Register here</h2>
            <div className='col-md-4 mt-3 py-5'>
                <div className='card p-3 bg-white'>
                    <h2 className='pt-2 px-4'>Register</h2>
                    <form onSubmit={handleSubmit(registerSubmit)}>
                        <div className='form-group'>
                            <h5>Name</h5>
                            <input type="text" className='form-control' placeholder='enter name' required autoFocus
                                {...register("user", { required: true, minLength: 6 })} />
                            {errors.user && <p className='text-danger mt-1'>Name should be of atleast characters</p>}
                        </div>
                        <div className=' mt-4 form-group'>
                            <h5>Email</h5>
                            <input type="email" className='form-control' placeholder='enter mail' required
                                {...register("email", {
                                    required: true,
                                    pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                                })} />
                            {errors.email && <p className='text-danger mt-1'>Please check and enter correct email</p>}
                        </div>
                        <div className=' mt-4 form-group'>
                            <h5>Password</h5>
                            <input type='password' className='form-control' placeholder='enter password' required
                                {...register("password", {
                                    required: true,
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                                })}
                            />
                            {errors.password && <div className='text-danger mt-1'>
                                <p>password should be of length greater than 8</p>
                                <p>should contain atleast one uppercase, lowercase, number and special character.</p>
                            </div>
                            }
                        </div>
                        <div className=' mt-4 form-group'>
                            <h5>Confirm Password</h5>
                            <input type='password' className='form-control' placeholder='confirm password' required
                                {...register("cpassword", {
                                    required: true,
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                                })}
                            />
                            {errors.cpassword && <div className='text-danger mt-1'>
                                <p>password should be of length greater than 8</p>
                                <p>should contain atleast one uppercase, lowercase, number and special character.</p>
                            </div>
                            }
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='submit-btn mt-5'>Submit</button>
                        </div>
                    </form>
                    <Link className='text-primary text-center my-3' to='/'>Already registered? Click here to Login</Link>
                </div>
            </div>
            <div className='col-md-6'>
                <div className="flex justify-center w-75 h-75">
                    <lottie-player src={lottieURL} background="transparent" speed="1" autoplay></lottie-player>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register