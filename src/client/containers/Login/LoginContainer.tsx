import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../utils/shared/store';
import actionTypes from '../../utils/actionTypes';
import Login from '../../components/Login/Login';

interface AuthDetails {
  token: string;
  role: string;
  studentId?: string;
  teacherId?: string;
  userName: string;
}

interface AuthState {
  authDetails: AuthDetails | null;
  error: string | null;
}

const LoginContainer: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authDetails, error }: AuthState = useSelector((state: RootState) => state.authLogin);

  useEffect(() => {
    if (authDetails) {
      localStorage.setItem('token', authDetails.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', authDetails.role);
      localStorage.setItem('userName', authDetails.userName);

      if (authDetails.role === 'STUDENT' && authDetails.studentId) {
        localStorage.setItem('studentId', authDetails.studentId);
        localStorage.setItem('userId', authDetails.studentId);
      }

      if (authDetails.role === 'TEACHER' && authDetails.teacherId) {
        localStorage.setItem('teacherId', authDetails.teacherId);
        localStorage.setItem('userId', authDetails.teacherId);
      }

      navigate('/active-competition');
    }
  }, [authDetails, navigate]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.AUTH_LOGIN,
      payload: {
        loginDetails: {
          userName: username,
          password,
        },
      },
    });
  };

  return (
    <Login
      email={username}
      password={password}
      error={error || ''}
      onEmailChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
    />
  );
};

export default LoginContainer;
