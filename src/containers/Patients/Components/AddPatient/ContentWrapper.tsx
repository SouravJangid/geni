import React from 'react';
import AddPatientStyle from './AddPatient.module.scss';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useMultiStepForm } from 'containers/Patients/hooks/useMultiStepForm';
import SteppersContainer from './SteppersContainer';

const ContentWrapper = () => {
  const { currentStepIndex } = useMultiStepForm();

  return (
    <div className={AddPatientStyle['content']}>
      <SteppersContainer activeStep={currentStepIndex} />
      <form className={AddPatientStyle['stepWrapper']}>
        {currentStepIndex === 0 && <Step1 />}
        {currentStepIndex === 1 && <Step2 />}
        {currentStepIndex === 2 && <Step3 />}
      </form>
    </div>
  );
};

export default ContentWrapper;
