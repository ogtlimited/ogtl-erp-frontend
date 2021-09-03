import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import axiosInstance from '../../services/api'
import tokenService from '../../services/token.service'

const Login = () => {
    let history = useHistory()
    const [errorMsg, seterrorMsg] = useState('')
    const {register, handleSubmit, formState: { errors }  } = useForm()
    const onSubmit = (data) =>{
        axiosInstance.post('/api/login', data).then(res =>{
            console.log(res)
            tokenService.setUser(res.data.employee)
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
        <div class="main-wrapper">
            <div class="account-content">
                <div class="container">
                    <div class="account-logo">
                        <Link href="/">
                            <img class="logo" src="/static/media/outsource.2499b5b3.png" alt="Outsource Global Technologies"/>
                        </Link>
                    </div>
                    <div class="account-box">
                        <div class="account-wrapper">
                            <h3 class="account-title">Login</h3>
                            <p class="account-subtitle">Access to our dashboard</p>
                            <h6 className="text-center">
                            <small class="account-subtitle text-center error">{errorMsg}</small>
                            </h6>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-group">
                                    <label htmlFor="ogid">OGID </label>
                                    <input type="text" name="ogid" id="ogid" {...register('ogid', { required: true })} class="form-control" />
                                    {errors.ogid && errors.ogid.type === "required" && <span className="error">OGID is required</span>}
                                </div>
                                <div class="form-group mt-2">
                                    <div class="row">
                                        <div class="col">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div class="col-auto">
                                            <a class="text-muted" href="/">Forgot password?</a>
                                        </div>
                                    </div>
                                        <input type="password" id="password" name="password" {...register('password', { required: true },)} class="form-control" />
                                        {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
                                    </div>
                                    <div class="form-group text-center">
                                            <button class="btn btn-primary account-btn" type="submit">Login</button>
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
