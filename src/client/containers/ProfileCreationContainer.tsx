import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box, Divider, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateStudent from '../components/CreateStudent';
import Snackbar from '../components/Snackbar';
import actionTypes from '../utils/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/shared/store';

interface Student {
  id?: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  type?: string;
  password?: string;
  courses?: string | any;
  batches?: string | any;
}

interface StudentMasterListState {
  studentList: any;
  isLoading: boolean;
  error: string;
}

const courseList = ['Light Music', 'Carnatic Music', 'Devotional Music'];

const ProfileCreationContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const { studentList }: StudentMasterListState = useSelector((state: RootState) => state.getAllStudents);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_ALL_STUDENTS,
    });
  }, [dispatch]);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSaveStudent = (newStudent: Student) => {
    newStudent.type = 'STUDENT';
    dispatch({
      type: actionTypes.ADD_STUDENT,
      payload: {
        createCompetition: newStudent,
      },
    });
    handleCloseDialog();
    setSnackbarMessage('Student created successfully!');
    setSnackbarOpen(true);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Profile Creation
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          startIcon={<AddIcon />}
          sx={{ whiteSpace: 'nowrap', width: '200px' }}
        >
          Create Student
        </Button>
      </Box>
      <Box sx={{ padding: 3, paddingTop: 0 }}>
        <Divider sx={{ mb: 4 }} />
        <div style={{ height: 400, width: '100%' }}>
          <DataTable
            value={studentList}
            stripedRows
            paginator
            removableSort
            globalFilterFields={['batches', 'username', 'firstname', 'lastname', 'email', 'courses']}
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}
            emptyMessage="No students found"
          >
            <Column field="studentName" header="Student Name" sortable />
            <Column field="userName" header="Username" sortable />
            <Column field="studentEmail" header="Email" sortable />
            <Column field="batchId" header="Batch Name" sortable />
            <Column field="courseName" header="Course Name" sortable />
          </DataTable>
        </div>
        <CreateStudent
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveStudent}
          courses={courseList}
        />
        <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
      </Box>
    </div>
  );
};

export default ProfileCreationContainer;
