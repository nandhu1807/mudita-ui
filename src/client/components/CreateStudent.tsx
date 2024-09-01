import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  ListItemText,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material/Select';

interface CreateStudentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
  courses: string[];
}

interface Student {
  batchId: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  courseName: string;
}

const CreateStudent: React.FC<CreateStudentDialogProps> = ({ open, onClose, onSave, courses }) => {
  const [student, setStudent] = useState<Student>({
    batchId: '',
    userName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    courseName: '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleCourseChange = (event: SelectChangeEvent<string>) => {
    setStudent({ ...student, courseName: event.target.value as string });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!student.userName) newErrors.userName = 'Username is required';
    if (!student.firstName) newErrors.firstName = 'First Name is required';
    if (!student.lastName) newErrors.lastName = 'Last Name is required';
    if (!student.email) newErrors.email = 'Email is required';
    if (!student.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(student);
      handleClose();
    }
  };

  const isValid = () => {
    return (
      student.batchId &&
      student.userName &&
      student.firstName &&
      student.lastName &&
      student.phoneNumber &&
      student.email &&
      student.password &&
      student.courseName
    );
  };

  const handleClose = () => {
    setStudent({
      batchId: '',
      userName: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      courseName: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Create Student Profile
      </DialogTitle>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        sx={{ position: 'absolute', right: 24, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          label="User Name"
          name="userName"
          fullWidth
          variant="outlined"
          value={student.userName}
          onChange={handleInputChange}
          error={!!errors.userName}
          helperText={errors.userName}
          required={true}
          sx={{ mb: 3 }}
        />
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          variant="outlined"
          value={student.firstName}
          onChange={handleInputChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required={true}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          variant="outlined"
          value={student.lastName}
          onChange={handleInputChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required={true}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          variant="outlined"
          value={student.phoneNumber}
          onChange={handleInputChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          required={true}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          variant="outlined"
          value={student.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          required={true}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          value={student.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
          required={true}
          sx={{ mb: 3 }}
        />
        <FormControl fullWidth error={!!errors.course} sx={{ mb: 3 }} required>
          <InputLabel id="course-label">Course</InputLabel>
          <Select
            labelId="course-label"
            value={student.courseName}
            onChange={handleCourseChange}
            renderValue={(selected) => selected || 'Select a course'}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          >
            {courses.map((course) => (
              <MenuItem key={course} value={course}>
                <ListItemText primary={course} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.course}</FormHelperText>
        </FormControl>
        <TextField
          label="Batch Id"
          name="batchId"
          fullWidth
          variant="outlined"
          value={student.batchId}
          onChange={handleInputChange}
          error={!!errors.batchId}
          helperText={errors.batchId}
          required={true}
          sx={{ mb: 3 }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Box
          sx={{
            mt: 1,
            mb: 3,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'background.paper',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleClose} sx={{ width: '100px', mr: 3 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ width: '100px' }}
            disabled={!isValid()}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStudent;
