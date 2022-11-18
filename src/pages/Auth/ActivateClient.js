/** @format */
import axios from "axios";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import config from '../../config.json';

const ActivateClient = () => {
  const navigate = useNavigate();
  const id = new URLSearchParams(useLocation().search);
  const clientId = id.get("id");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum of 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .min(8, 'Minimum of 8 characters')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    setLoading(true);

        const obj = {
          password: data.password,
          activated: true,
          spammy: false,
        };

    console.log({
      payload: obj,
      id: clientId,
    })

    try {
      const res = await axios.patch(config.ApiUrl + `/api/client_account/${clientId}`, obj);
      const resData = res.data.data;
      console.log('activated account', resData);

      navigate('/auth/client-login');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
   
  };
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="container">
          <div className="account-logo">
            <Link to="/">
              <img
                className="logo"
                src="/static/media/outsource.2499b5b3.png"
                alt="Outsource Global Technologies"
              />
            </Link>
          </div>
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title mb-30">Activate Account</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Password </label>
                  <input
                    name="password"
                    type="password"
                    {...register('password')}
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>
                <div className="form-group mt-2">
                  <div className="row">
                    <div className="col">
                      <label>Confirm Password</label>
                    </div>
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    className={`form-control ${
                      errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                  />
                 <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
                <div className="form-group text-center">
                  <button
                    className="btn btn-primary account-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      'Confirm'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="go-to-client"></div>
        </div>
      </div>
    </div>
  );
};

export default ActivateClient;
