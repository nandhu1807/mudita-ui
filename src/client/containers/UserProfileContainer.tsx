import React, { useEffect, useState } from 'react';
import UserProfileAndPasswordChange from '../components/UserProfileAndPasswordChange';
import { Box, Divider, Typography } from '@mui/material';
import actionTypes from '../utils/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/shared/store';
import Snackbar from '../components/Snackbar';

interface UserProfilesState {
  userProfile: any;
  isLoading: boolean;
  error: string;
}

const UserProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const { userProfile }: UserProfilesState = useSelector((state: RootState) => state.getUserProfile);
  const { updatePassword, error }: any = useSelector((state: RootState) => state.updatePassword);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_USER_PROFILE,
      payload: {
        userId: localStorage.getItem('userId'),
        type: localStorage.getItem('role'),
      },
    });
  }, [dispatch]);

  useEffect(() => {
    if (updatePassword !== null && updatePassword.message === 'Password updated successfully!') {
      setNewPassword('');
      setOldPassword('');
      setSnackbarMessage('Password updated successfully !');
      setSnackbarOpen(true);
    }
  }, [updatePassword, error]);

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!oldPassword) newErrors.oldPassword = 'Old password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = () => {
    if (validateForm()) {
      dispatch({
        type: actionTypes.UPDATE_PASSWORD,
        payload: {
          updatePassword: {
            userName: userProfile.userName,
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
        },
      });
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          User Profile
        </Typography>
      </Box>
      <Box sx={{ padding: 3, paddingTop: 0, paddingBottom: 0 }}>
        <Divider sx={{ mb: 2 }} />
      </Box>
      {userProfile !== null && (
        <UserProfileAndPasswordChange
          data={userProfile}
          oldPassword={oldPassword}
          newPassword={newPassword}
          errors={errors}
          apiError={error}
          handleOldPasswordChange={handleOldPasswordChange}
          handleNewPasswordChange={handleNewPasswordChange}
          handlePasswordChange={handlePasswordChange}
        />
      )}
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </div>
  );
};

export default UserProfileContainer;
