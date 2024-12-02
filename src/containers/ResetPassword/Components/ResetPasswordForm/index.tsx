import React from 'react';
import resetPasswordFormStyles from './ResetPasswordForm.module.scss';
import { Button, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import ArrowBack from '@mui/icons-material/ArrowBack';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface resetPasswordFormProps {}

const resetPasswordForm: React.FC<resetPasswordFormProps> = () => {
  return (
    <div className={resetPasswordFormStyles.resetPasswordWrapper}>
      <div className={resetPasswordFormStyles.logoContainer}>
        <Button variant='outlined'>Logo</Button>
      </div>
      <div className={resetPasswordFormStyles.resetPasswordContainer}>
        <Button fullWidth={false} variant='text' startIcon={<ArrowBack />} className={resetPasswordFormStyles.backBtn}>
          Back
        </Button>
        <h5 className={resetPasswordFormStyles.resetPasswordTitle}>{`Recover Password`}</h5>
        <form className={resetPasswordFormStyles.formWrapper}>
          <div className={resetPasswordFormStyles.inputContainer}>
            <TextField label='Username/ Email' variant='outlined' />
          </div>
          <Divider className={resetPasswordFormStyles.divider} />
          <Button variant='contained' className={resetPasswordFormStyles.resetPasswordButton}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default resetPasswordForm;
