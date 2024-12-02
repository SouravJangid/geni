import React from 'react';
import ResetPasswordStyles from './ResetPassword.module.scss';
import ResetPasswordSideImage from 'assets/images/reset-password-side-img.png';
import ResetPasswordForm from './Components/ResetPasswordForm';

const ResetPassword: React.FC = () => {
  return (
    <div className={ResetPasswordStyles['reset-password-wrapper']}>
      <div className={ResetPasswordStyles['reset-password-container']}>
        <div className='reset-password-img-container'>
          <img src={ResetPasswordSideImage} alt='reset-password-side-img' />
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default React.memo(ResetPassword);
