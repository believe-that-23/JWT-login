import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams , Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Verifyemail() {
    const params = useParams()

    const tokenVerify = async () => {
        try {
            const res = await axios.post('/auth/verify-mail', { token: params.token });
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
                setTimeout(() => {
                    window.close();
                }, 4000)
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
                setTimeout(() => {
                    window.close();
                }, 4000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        tokenVerify()
    }, [])

    return (
        <div className='mx-auto'>
            <Link className='btn btn-dark' to='/'> Go to Login Page </Link>
            <ToastContainer />
        </div>
    )
}

export default Verifyemail