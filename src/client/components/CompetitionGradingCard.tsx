import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Tooltip, Box } from '@mui/material';
import moment from 'moment';
import thumbnail from '../images/thumbnail-image.png';

interface Competition {
  competitionId: number;
  title: string;
  startDate: string;
  endDate: string;
  date: string;
  shortDescription: string;
  descriptionText: string;
  status: string;
  prize: any;
}

interface GradingCompetitionCardProps {
  competitions: Competition[];
  onClick: (competition: Competition) => void;
}

const CompetitionGradingCard: React.FC<GradingCompetitionCardProps> = ({ competitions, onClick }) => {
  return (
    <Grid container spacing={3}>
      {competitions.map((competition) => (
        <Grid item xs={12} sm={6} md={4} key={`competition-${competition.competitionId}`}>
          <Card
            onClick={() => onClick(competition)}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={thumbnail}
              alt={`${competition.title} image`}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {competition.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                mt={2}
              >
                <span>Start Date: {moment(competition.startDate).format('MM/DD/YYYY')}</span>
                <span>End Date: {moment(competition.endDate).format('MM/DD/YYYY')}</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={2} mb={2}>
                {competition.shortDescription}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  height: '100%',
                  mt: 1,
                }}
              >
                <Tooltip title="View Submission Entries" arrow>
                  <Typography sx={{ color: '#1a0dab', textDecoration: 'underline' }}>
                    {'View Submission Entries'}
                  </Typography>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompetitionGradingCard;
