export interface Competition {
    competitionId: number;
    title: string;
    date: string;
    descriptionText: string;
    status: string;
    image?: string;
    startDate: string;
    endDate: string;
    prize: any;
}

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
