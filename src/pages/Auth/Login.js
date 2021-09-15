import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import axiosInstance from '../../services/api'
import tokenService from '../../services/token.service'

const Login = () => {
    let history = useHistory()
    let {fetchEmployeeAttendance, fetchEmployee,setloggedIn} = useAppContext()
    const [errorMsg, seterrorMsg] = useState('')
    const {register, handleSubmit, formState: { errors }  } = useForm()
    const onSubmit = (data) =>{
        axiosInstance.post('/api/login', data).then(res =>{
            console.log(res)
            tokenService.setUser(res.data.employee)
            setloggedIn(true)
            // fetchEmployee()
            // fetchEmployeeAttendance()
            tokenService.setToken(res.data.token.token);
            history.push('admin/employee-dashboard')
        }).catch(err =>{
            console.log(err)
            console.log(err.message?.message)
            seterrorMsg('Unable to login either ogid or password is incorrect')
            // setInterval(() => {
            //     seterrorMsg('')
            // }, 5000);
            
        })
    }
    return (
        <div className="main-wrapper">
            <div className="account-content">
                <div className="container">
                    <div className="account-logo">
                        <Link href="/">
                            <img className="logo" src="/static/media/outsource.2499b5b3.png" alt="Outsource Global Technologies"/>
                        </Link>
                    </div>
                    <div className="account-box">
                        <div className="account-wrapper">
                            <h3 className="account-title">Login</h3>
                            <p className="account-subtitle">Access to our dashboard</p>
                            <h6 className="text-center">
                            <small className="account-subtitle text-center error">{errorMsg}</small>
                            </h6>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="ogid">OGID </label>
                                    <input type="text" name="ogid" id="ogid" {...register('ogid', { required: true })} className="form-control" />
                                    {errors.ogid && errors.ogid.type === "required" && <span className="error">OGID is required</span>}
                                </div>
                                <div className="form-group mt-2">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col-auto">
                                            <a className="text-muted" href="/">Forgot password?</a>
                                        </div>
                                    </div>
                                        <input type="password" id="password" name="password" {...register('password', { required: true },)} className="form-control" />
                                        {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
                                    </div>
                                    <div className="form-group text-center">
                                            <button className="btn btn-primary account-btn" type="submit">Login</button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
