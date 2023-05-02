import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [name, setName] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const updateSubmit = async (data) => {
    if (data.password === data.cpassword) {
      const updateUser = {
        email: name.email,
        password: data.password,
        cupassword: data.cupassword
      }
      
      axios.post('/auth/update', { updateUser })
      .then(res => {
        if (res.data.success) {
            toast.success(res.data.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.removeItem('data');
            setTimeout(() => {
              window.location.href = '/'
            }, 3500)
          } else {
            toast.error(res.data.msg, {
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
        .catch(err => {
          console.log(err);
        })
    } else {
      toast.error("Passwords don't match", {
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

  const logout = () => {
    localStorage.removeItem('data');
    navigate('/');
  }

  const loadData = async () => {
    try {
      const token = await JSON.parse(localStorage.getItem('data'));
      const res = await axios.get('/auth/userdata', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        setName(res.data.data);
      } else {
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])


  return (
    <div className='container'>
      <div className='bg-success p-5'>
        <h2 className='text-white text-center'>Dashboard</h2>
      </div>
      <div className='mt-5 p-3'>
        <button className='btn mt-3 btn-danger float-end' onClick={logout}>Logout</button>
        <br />

        <h2 className='mt-5'>hi {name?.user}</h2>
        <h2>{name?.email}</h2>
      </div>
      <div className='mt-4'>
        <div className='col-md-5 mx-auto mt-3 p-5'>
          <div className="card-p-3 bg-white border">
            <h2 className="pt-4 px-2 text-center">Update Details</h2>
            <form className="mt-5 mx-4" onSubmit={handleSubmit(updateSubmit)}>
              <div className='form-group'>
                <h5>Name</h5>
                <input type="text" value={name?.user} className='form-control' readOnly />
              </div>
              <div className="form-group mt-4">
                <h5>Email</h5>
                <input type="text" value={name?.email} className='form-control' readOnly />
              </div>
              <div className="form-group mt-4">
                <h5>Current Password</h5>
                <input type="password" className='form-control' placeholder='enter current password'
                  {...register("cupassword", {
                    required: true,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                  })} />
                {errors.cupassword && <div className='text-danger mt-1'>
                  <p>password should be of length greater than 8</p>
                  <p>should contain atleast one uppercase, lowercase, number and special character.</p>
                </div>
                }
              </div>
              <div className="form-group mt-4">
                <h5>New Password</h5>
                <input type="password" className='form-control' placeholder='enter new password'
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                  })} />
                {errors.password && <div className='text-danger mt-1'>
                  <p>password should be of length greater than 8</p>
                  <p>should contain atleast one uppercase, lowercase, number and special character.</p>
                </div>
                }
              </div>
              <div className="form-group mt-4">
                <h5>Confirm New Password</h5>
                <input type="password" className='form-control' placeholder='confirm password'
                  {...register("cpassword", {
                    required: true,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                  })} />
                {errors.cpassword && <div className='text-danger mt-1'>
                  <p>password should be of length greater than 8</p>
                  <p>should contain atleast one uppercase, lowercase, number and special character.</p>
                </div>
                }
              </div>
              <div className='text-center'>
                <button type='submit' className='submit-btn m-5'>submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Dashboard