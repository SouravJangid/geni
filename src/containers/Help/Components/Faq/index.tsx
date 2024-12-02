import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FaqStyles from './Faq.module.scss';

const FaqContent: React.FC = () => {
  return (
    <div className={FaqStyles['container']}>
      <div className={FaqStyles['accordionContainer']}>
        <div className={FaqStyles['accordion-wrapper']}>
          <Accordion className={FaqStyles['accordion']}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className={FaqStyles['divider']} />
        <div className={FaqStyles['accordion-wrapper']}>
          <Accordion className={FaqStyles['accordion']}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={FaqStyles['divider']} />
        <div className={FaqStyles['accordion-wrapper']}>
          <Accordion className={FaqStyles['accordion']}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqContent;
