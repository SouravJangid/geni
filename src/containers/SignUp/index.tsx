import React from 'react';
import SignUpStyles from './SignUp.module.scss';
import LoginSideImage from 'assets/images/login-side-img.png';
import AccountForm from './Components/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <div className={SignUpStyles['login-wrapper']}>
      <div className={SignUpStyles['login-container']}>
        <div className='login-img-container'>
          <img src={LoginSideImage} alt='login-side-img' />
        </div>
        <AccountForm />
      </div>
    </div>
  );
};

export default React.memo(SignUp);
