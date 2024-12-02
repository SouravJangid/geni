import React from 'react';
import AddDoctorStyle from './AddDoctor.module.scss';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useMultistepForm } from 'containers/Doctors/hooks/useMultistepForm';
import SteppersContainer from './SteppersContainer';

const ContentWrapper = () => {
  const { currentStepIndex } = useMultistepForm();

  return (
    <div className={AddDoctorStyle['content']}>
      <SteppersContainer activeStep={currentStepIndex} />
      <form className={AddDoctorStyle['stepWrapper']}>
        {currentStepIndex === 0 && <Step1 />}
        {currentStepIndex === 1 && <Step2 />}
        {currentStepIndex === 2 && <Step3 />}
      </form>
    </div>
  );
};

export default ContentWrapper;
