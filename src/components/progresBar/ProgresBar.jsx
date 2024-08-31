import React from "react";
import { Box, Step, Stepper, StepLabel, Typography, Container } from "@mui/material";

function ProgressBar({ activeStep, steps }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ width: "100%", padding: "2rem 0", display: 'flex', justifyContent: 'center' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  <Typography variant="subtitle1">{label}</Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </Container>
  );
}

export default ProgressBar;
