import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Divider, IconButton, Tooltip } from '@mui/material';
import { Competition } from '../../types';
import moment from 'moment';
import thumbnail from '../images/thumbnail-image.png';

interface CompetitionsProps {
  competitions: Competition[];
  type: 'upcoming' | 'past' | 'active';
  role: 'STUDENT' | 'ADMIN' | 'TEACHER' | '';
  onCompetitionSelect: (competition: Competition) => void;
  userProfile: any;
}

const checkIfValueExists = (str: string, value: string): boolean => {
  const valuesArray = str.split(',').map((val) => val.trim());

  return valuesArray.includes(value);
};

const CompetitionCard: React.FC<{
  competition: Competition;
  type: string;
  role: 'STUDENT' | 'ADMIN' | 'TEACHER' | '';
  onCompetitionSelect: (competition: Competition) => void;
  userProfile: any;
}> = ({ competition, type, role, onCompetitionSelect, userProfile }) => {
  const handleClick = () => onCompetitionSelect(competition);

  const getStatusMessage = (): { text: string; color: 'textPrimary' | 'error' } => {
    if (role === 'STUDENT' && userProfile !== null) {
      if (checkIfValueExists(competition.courseList, userProfile.courseName)) {
        return { text: 'Click to Submit Entry', color: 'textPrimary' };
      } else {
        return { text: 'Competition Not Applicable', color: 'error' };
      }
    }
    return { text: 'View Submission Entries', color: 'textPrimary' };
  };

  const status = getStatusMessage();

  return (
    <Grid item xs={12} sm={6} md={4} key={`competition-${competition.competitionId}`}>
      <Card
        sx={{
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
          <Typography variant="body2" color="textSecondary" mt={2} mb={2}>
            {`Courses Applicable to ${competition.courseList}`}
          </Typography>
          {type !== 'past' && (
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
              <Typography
                component="a"
                href={competition.videoFiles}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#1a0dab', cursor: 'pointer', textAlign: 'center', display: 'inline-block' }}
              >
                Click to View Instructions
              </Typography>
            </Box>
          )}
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
            {type === 'past' && (
              <Tooltip title="View Results" arrow>
                <IconButton onClick={handleClick}>
                  <Typography sx={{ color: '#1a0dab', textDecoration: 'underline' }}>View Results</Typography>
                </IconButton>
              </Tooltip>
            )}
            {type === 'active' && (
              <div>
                {status.text === 'Competition Not Applicable' ? (
                  <Typography variant="body1" color={status.color} sx={{ mt: 2 }}>
                    {status.text}
                  </Typography>
                ) : (
                  <Tooltip title={status.text} arrow>
                    <IconButton onClick={handleClick}>
                      <Typography
                        variant="body1"
                        color={status.color}
                        sx={{ color: '#1a0dab', textDecoration: 'underline' }}
                      >
                        {status.text}
                      </Typography>
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Competitions: React.FC<CompetitionsProps> = ({ competitions, type, role, onCompetitionSelect, userProfile }) => {
  return (
    <Box sx={{ padding: 3, paddingTop: 0 }}>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        {competitions.map((competition) => (
          <CompetitionCard
            key={competition.competitionId}
            competition={competition}
            type={type}
            role={role}
            onCompetitionSelect={onCompetitionSelect}
            userProfile={userProfile}
          />
        ))}
      </Grid>
      {competitions.length === 0 && (
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mt: 3, fontWeight: 'bold' }}>
          No Competitions available at the moment
        </Typography>
      )}
    </Box>
  );
};

export default Competitions;
