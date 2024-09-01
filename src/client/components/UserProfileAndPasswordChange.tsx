import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';

interface ProfileAndPasswordChangeViewProps {
  data: {
    batchId: string;
    studentName: string;
    studentEmail: string;
    phoneNumber: string;
    courseName: string;
  };
  oldPassword: string;
  newPassword: string;
  errors: {
    oldPassword?: string;
    newPassword?: string;
  };
  handleOldPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: () => void;
}

const CardTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '16px',
});

const ProfileCard = styled(Card)({
  marginBottom: '24px',
  padding: '16px',
});

const StyledButton = styled(Button)({
  borderRadius: '8px',
  padding: '12px 24px',
  marginTop: '8px',
  marginBottom: '16px',
});

const Section = styled(Box)({
  width: '50%',
  marginBottom: '24px',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const FormTitle = styled(Typography)({
  marginBottom: '16px',
  fontWeight: 'bold',
  color: '#333',
});

const StyledFormControl = styled(FormControl)({
  width: '100%',
  marginBottom: '16px',
});

const UserProfileAndPasswordChange: React.FC<ProfileAndPasswordChangeViewProps> = ({
  data,
  oldPassword,
  newPassword,
  errors,
  handleOldPasswordChange,
  handleNewPasswordChange,
  handlePasswordChange,
}) => {
  return (
    <Box sx={{ padding: 3, paddingBottom: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProfileCard variant="outlined">
            <CardContent>
              <CardTitle variant="h5">Profile Information</CardTitle>
              <Typography variant="body1">
                <strong>Batch ID:</strong> {data.batchId}
              </Typography>
              <Typography variant="body1">
                <strong>Student Name:</strong> {data.studentName}
              </Typography>
              <Typography variant="body1">
                <strong>Student Email:</strong> {data.studentEmail}
              </Typography>
            </CardContent>
          </ProfileCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileCard variant="outlined">
            <CardContent>
              <CardTitle variant="h5">Additional Information</CardTitle>
              <Typography variant="body1">
                <strong>Phone Number:</strong> {data.phoneNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Course Name:</strong> {data.courseName}
              </Typography>
            </CardContent>
          </ProfileCard>
        </Grid>
      </Grid>

      <Section>
        <FormTitle variant="h6">Change Password</FormTitle>
        <StyledFormControl fullWidth variant="outlined" error={!!errors.oldPassword} sx={{ mt: 3, mb: 3 }}>
          <InputLabel htmlFor="old-password">Old Password</InputLabel>
          <OutlinedInput
            id="old-password"
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            label="Old Password"
            sx={{ borderRadius: 1 }}
          />
          <FormHelperText>{errors.oldPassword}</FormHelperText>
        </StyledFormControl>
        <StyledFormControl fullWidth variant="outlined" error={!!errors.newPassword} sx={{ mb: 3 }}>
          <InputLabel htmlFor="new-password">New Password</InputLabel>
          <OutlinedInput
            id="new-password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            label="New Password"
            sx={{ borderRadius: 1 }}
          />
          <FormHelperText>{errors.newPassword}</FormHelperText>
        </StyledFormControl>
        <StyledButton variant="contained" color="primary" onClick={handlePasswordChange}>
          Change Password
        </StyledButton>
      </Section>
    </Box>
  );
};

export default UserProfileAndPasswordChange;
