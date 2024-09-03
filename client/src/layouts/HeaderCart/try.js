import { useState, useEffect } from 'react';
import router from 'next/router';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Checkout } from '@/components/Cart/Checkout';
import { Payment } from '@/components/Cart/Payment';
import { Confirmation } from '@/components/Cart/Confirmation';

export function Try(props) {
  const { books } = props;
  const { query } = router;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = [
    { number: 1, title: 'Checkout' },
    { number: 2, title: 'Payment' },
    { number: 3, title: 'Confirmation' },
    { number: 4, title: 'Processing' },
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

  const handleFinish = () => {
    setTimeout(() => {
      router.push('/');
    }, 7000);
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

  // Render Condicional basado en activeStep
  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Checkout books={books} />;
      case 1:
        return <Payment />;
      case 2:
        return <Confirmation />;
      case 3:
        return <Processing />;
      default:
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: '100%' }}>
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
        {activeStep === steps.length ? (
          <Typography sx={{ mt: 2, mb: 1 }}>
            Thank you so much for your order! We will send you a confirmation
            email.
          </Typography>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? (
                  <div onClick={handleFinish}>Finish</div>
                ) : (
                  'Next'
                )}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
