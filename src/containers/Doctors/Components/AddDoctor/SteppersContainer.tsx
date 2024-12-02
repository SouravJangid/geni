import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import { TbUserEdit } from 'react-icons/tb';
import { FiBriefcase } from 'react-icons/fi';
import { CiCircleInfo } from 'react-icons/ci';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import AddDoctorStyle from './AddDoctor.module.scss';

const Connector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: `calc(-50% + 36px)`,
    right: `calc(50% + 36px)`,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    background: '#E7E7E7',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#0761E9',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#0B9D57',
    },
  },
}));

const StepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(() => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundColor: '#0761E9',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        color: 'white',
        backgroundColor: 'green',
      },
    },
  ],
}));

const IconStyle = {
  width: '50%',
  height: 'auto',
};

function StepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons: { [index: string]: React.ReactElement<any> } = {
    1: <TbUserEdit style={IconStyle} />,
    2: <FiBriefcase style={IconStyle} />,
    3: <CiCircleInfo style={IconStyle} />,
  };

  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check /> : icons[String(props.icon)]}
    </StepIconRoot>
  );
}

const steps = ['Basic Information', 'Specialization', 'Clinic Information'];

export default function SteppersContainer({ activeStep }: { activeStep: number }) {
  return (
    <div className={AddDoctorStyle['stepperContainer']}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<Connector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
