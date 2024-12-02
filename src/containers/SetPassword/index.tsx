import React from 'react';
import SetPasswordStyles from './SetPassword.module.scss';
import SetPasswordSideImage from 'assets/images/set-password-side-img.png';
import SetPasswordForm from './Components/SetPasswordForm';

const SetPassword: React.FC = () => {
  return (
    <div className={SetPasswordStyles['set-password-wrapper']}>
      <div className={SetPasswordStyles['set-password-container']}>
        <div className='set-password-img-container'>
          <img src={SetPasswordSideImage} alt='set-password-side-img' />
        </div>
        <SetPasswordForm />
      </div>
    </div>
  );
};

export default React.memo(SetPassword);
