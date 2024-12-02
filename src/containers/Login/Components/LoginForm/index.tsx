import React, { useState } from 'react';
import LoginFormStyles from './LoginForm.module.scss';
import { Button, TextField } from '@mui/material';
import clsx from 'clsx';
import Divider from '@mui/material/Divider';
import { AxiosResponse } from 'axios';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { loginApiUrl } from 'containers/Login/constants';
import { useBusinessContext } from 'context/BusinessContext';
import get from 'lodash/get';
import { Link, useHistory } from 'react-router-dom';
import { Routes, ROUTES_ENUM } from 'constants/routes';
import MainLogo from 'assets/images/mainLogo.png';

const LoginForm: React.FC = () => {
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const { setUser } = useBusinessContext() as any;
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    slug: 'apollo',
  });

  const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (name: string, value: any) => {
    switch (name) {
      case 'username': {
        setErrorMessage({
          ...errorMessage,
          username: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            username: 'Username is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'password': {
        setErrorMessage({
          ...errorMessage,
          password: '',
        });
        if (!value || value.length < 8) {
          setErrorMessage({
            ...errorMessage,
            password: 'Password is a required field or must be at least 8 characters',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
    }
  };

  const validateForm = (data: any) => {
    const error: any = {};
    if (!data.username) {
      error['username'] = 'Username/email is a required field';
    }
    if (!data.password || data?.password?.length < 8) {
      error['password'] = 'Password is a required field or must be at least 8 characters';
    }
    setErrorMessage((prevErrors) => ({ ...prevErrors, ...error }));
    return !Object.keys(error)?.length;
  };

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
    const userData = get(res, 'data.data');
    if (userData?.token) {
      setUser(userData);
      history.push(Routes[ROUTES_ENUM.DASHBOARD]);
    }
  }

  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  const handleFormSubmit = async () => {
    const isValidateForm = validateForm(formData);
    if (isValidateForm) {
      callOpenApi({ method: 'POST', url: loginApiUrl, data: formData });
    }
  };

  return (
    <div className={LoginFormStyles.loginWrapper}>
      <div className={LoginFormStyles.logoContainer}>
        <img src={MainLogo} className={LoginFormStyles.logoImg} alt='logo' />
      </div>
      <div className={LoginFormStyles.loginContainer}>
        <h6 className={LoginFormStyles.loginTitle}>{`Let's Login`}</h6>
        <form className={LoginFormStyles.formWrapper}>
          <div className={clsx(LoginFormStyles.inputContainer, LoginFormStyles.userField)}>
            <TextField
              label='Username/email'
              variant='outlined'
              name='username'
              value={formData?.username}
              onChange={(e) => handleFormChange('username', e.target.value)}
              error={!!errorMessage?.username}
              helperText={errorMessage?.username}
            />
          </div>
          <div className={LoginFormStyles.inputContainer}>
            <TextField
              type='password'
              label='Password'
              variant='outlined'
              name='password'
              value={formData?.password}
              onChange={(e) => handleFormChange('password', e.target.value)}
              error={!!errorMessage?.password}
              helperText={errorMessage?.password}
            />
          </div>
          <a href='#' className={LoginFormStyles.forgotPassword}>
            Forgot password?
          </a>
          <Divider className={LoginFormStyles.divider} />
          <Button variant='contained' className={LoginFormStyles.loginButton} onClick={handleFormSubmit}>
            Login
          </Button>
        </form>
      </div>
      <div className={LoginFormStyles.createAccountContainer}>
        <p className={LoginFormStyles.createAccountHelperText}>If you don’t have account please create here</p>
        <Link to='/signup'>
          <Button className={LoginFormStyles.createAccountBtn} variant='outlined'>
            Create Account
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
