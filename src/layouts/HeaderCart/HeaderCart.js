import { useState, useEffect } from 'react';
import router from 'next/router';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Checkout } from '@/components/Cart/Checkout';
import { Payment } from '@/components/Cart/Payment';
import { Confirmation } from '@/components/Cart/Confirmation';

export function HeaderCart(props) {
  const { books } = props;
  const { query } = router;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = [
    { number: 1, title: 'Checkout' },
    { number: 2, title: 'Payment' },
    { number: 3, title: 'Confirmation' },
  ];

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { ...query, step: activeStep + 1 },
    });
  }, [activeStep]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Theme for the stepper
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#96503e',
        contrastText: '#fffbef',
      },
      secondary: {
        main: '#d49a6a',
        contrastText: '#fffbef',
      },
      background: {
        default: '#fffbef',
        paper: '#fffbef',
      },
      text: {
        primary: '#6687b6',
        secondary: '#fffbef',
      },
    },
    typography: {
      fontFamily: 'ABeeZee, sans-serif',
    },
  });

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Checkout books={books} handleNext={handleNext} />;
      case 1:
        return (
          <Payment
            books={books}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return <Confirmation />;
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: '100%', width: '80%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={step.title} {...stepProps}>
                <StepLabel {...labelProps}>{step.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {renderStepContent(activeStep)}
      </Box>
    </ThemeProvider>
  );
}
