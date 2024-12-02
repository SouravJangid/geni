import React from 'react';
import LoginStyles from './Login.module.scss';
import LoginSideImage from 'assets/images/login-side-img.png';
import LoginForm from './Components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className={LoginStyles['login-wrapper']}>
      <div className={LoginStyles['login-container']}>
        <div className='login-img-container'>
          <img src={LoginSideImage} alt='login-side-img' />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default React.memo(Login);
