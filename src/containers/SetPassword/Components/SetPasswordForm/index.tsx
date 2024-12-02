import React from 'react';
import SetPasswordFormStyles from './SetPasswordForm.module.scss';
import { Button, TextField } from '@mui/material';
import clsx from 'clsx';
import Divider from '@mui/material/Divider';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface LoginFormProps {}

const SetPasswordForm: React.FC<LoginFormProps> = () => {
  return (
    <div className={SetPasswordFormStyles.loginWrapper}>
      <div className={SetPasswordFormStyles.logoContainer}>
        <Button variant='outlined'>Logo</Button>
      </div>
      <div className={SetPasswordFormStyles.loginContainer}>
        <h6 className={SetPasswordFormStyles.loginTitle}>{`Set new password`}</h6>
        <form className={SetPasswordFormStyles.formWrapper}>
          <div className={clsx(SetPasswordFormStyles.inputContainer, SetPasswordFormStyles.userField)}>
            <TextField type='password' label='Password' placeholder='New Password' variant='outlined' />
          </div>
          <div className={SetPasswordFormStyles.inputContainer}>
            <TextField type='password' label='Confirm Password' placeholder='Confirm Password' variant='outlined' />
          </div>
          <Divider className={SetPasswordFormStyles.divider} />
          <Button variant='contained' className={SetPasswordFormStyles.loginButton}>
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetPasswordForm;
