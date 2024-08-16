export interface CompetitionResult {
  studentName?: string;
  position?: number;
  score?: number;
  comment?: string;
}

export interface Competition {
  id?: number;
  competitionId: number;
  title: string;
  startDate: string;
  endDate: string;
  descriptionText: string;
  videoFiles?: string;
  image?: string;
  status: string;
  results?: CompetitionResult[];
  prize: any[];
}

export interface UpcomingCompetition {
  title: string;
  date: string;
  description: string;
  image: string;
}


export interface Student {
  studentId?: any;
  competitionDetailsId?: any;
  id: string;
  batchId: string;
  studentName: string;
  picture: string;
  studentFile: string;
  comments: string;
  studentComments?: string;
  studentGrade?: string;
  teacherComments?: string;
  prizeName?: string;
}
