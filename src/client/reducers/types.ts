import { Competition } from './competition';

export interface AuthDetails {
  token: string;
  role: string;
  studentId?: string;
  userName: string;
}

export interface AuthLoginState {
  authDetails: AuthDetails | null;
  isLoading: boolean;
  error: string;
}

interface AuthLoginAction {
  type: string;
  error?: string;
  response?: AuthDetails | string;
}

export type AuthLoginReducerAction = AuthLoginAction;

export interface PastCompetitionsState {
  pastCompetition: Competition[];
  isLoading: boolean;
  error: string;
}

export interface OngoingCompetitionsState {
  ongoingCompetition: Competition[];
  isLoading: boolean;
  error: string;
}

export interface UpcomingCompetitionsState {
  upcomingCompetition: Competition[];
  isLoading: boolean;
  error: string;
}

export interface ClosedCompetitionsState {
  closedCompetition: Competition[];
  isLoading: boolean;
  error: string;
}

export interface StudentCompetitionDetailsState {
  studentCompetitionDetails: any;
  isLoading: boolean;
  error: string;
}

export interface StudentCompetitionMasterDetailsState {
  studentCompetitionMasterDetails: any;
  isLoadingDetails: boolean;
  studentError: string;
}

export interface StudentMasterListState {
  studentList: any;
  isLoading: boolean;
  error: string;
}

export interface UserProfileState {
  userProfile: any;
  isLoading: boolean;
  error: string;
}