import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import actionTypes from '../utils/actionTypes';

interface CreateCompetitionProps {
  open: boolean;
  onClose: () => void;
}

const DatePickerField: React.FC<{
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}> = ({ label, selectedDate, onChange }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1">{label}</Typography>
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="MM/dd/yyyy"
      placeholderText={`Select ${label.toLowerCase()}`}
      wrapperClassName="datepicker-wrapper"
      className="datepicker-input"
    />
  </Box>
);

const CheckboxGroup: React.FC<{
  selectedCourses: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ selectedCourses, onChange }) => (
  <Box sx={{ mb: 2 }}>
    <FormControl component="fieldset">
      <Typography variant="subtitle1" gutterBottom>
        Courses Applicable To
      </Typography>
      <Grid container spacing={2}>
        {['LM', 'CM', 'DM'].map((course) => (
          <Grid item key={course}>
            <FormControlLabel
              control={<Checkbox value={course} checked={selectedCourses.includes(course)} onChange={onChange} />}
              label={course}
            />
          </Grid>
        ))}
      </Grid>
    </FormControl>
  </Box>
);

const CreateCompetition: React.FC<CreateCompetitionProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [explanationFile, setExplanationFile] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [courses, setCourses] = useState<string[]>([]);

  const handleSave = () => {
    dispatch({
      type: actionTypes.CREATE_COMPETITION,
      payload: {
        createCompetition: {
          title: name,
          descriptionText: shortDescription,
          startDate,
          endDate,
          videoFiles: explanationFile,
          course: {
            courseId: 1,
          },
        },
      },
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setCourses((prevCourses) => (checked ? [...prevCourses, value] : prevCourses.filter((course) => course !== value)));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>Create New Competition</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={{ width: '100%', padding: 2 }}>
          <TextField
            fullWidth
            label="Competition Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ sx: { fontSize: '1rem' } }}
          />
          <TextField
            fullWidth
            label="Competition Short Description"
            variant="outlined"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Competition Long Description"
            variant="outlined"
            multiline
            rows={4}
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Explanation File"
            variant="outlined"
            value={explanationFile}
            onChange={(e) => setExplanationFile(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePickerField label="Start Date" selectedDate={startDate} onChange={setStartDate} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField label="End Date" selectedDate={endDate} onChange={setEndDate} />
            </Grid>
          </Grid>
          <CheckboxGroup selectedCourses={courses} onChange={handleCourseChange} />
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              padding: 2,
              width: '100%',
              backgroundColor: 'background.paper',
            }}
          >
            <Button variant="outlined" onClick={handleCancel} sx={{ mr: 2, width: '200px' }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ width: '200px' }}>
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompetition;
