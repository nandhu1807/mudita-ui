export interface Competition {
    competitionId: number;
    title: string;
    date: string;
    shortDescription: string;
    descriptionText: string;
    status: string;
    image?: string;
    startDate: string;
    endDate: string;
    prize: any;
}
