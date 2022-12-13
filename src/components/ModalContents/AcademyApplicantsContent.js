/** @format */

import React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    marginTop: 5,
    marginBottom: 10,
    maxWidth: '100%',
    maxHeight: 130,
    overflowY: 'auto',
    overflowX: 'auto',
  },
  chip: {
    margin: theme.spacing(0.3),
  },
}));

const AcademyApplicantsContent = ({ jobApplication = {} }) => {
  const classes = useStyles();
  delete jobApplication.__v;
  delete jobApplication.__updatedAt;
  delete jobApplication.updatedAt;
  delete jobApplication.createdAt;
  delete jobApplication.last_name;
  delete jobApplication.first_name;
  delete jobApplication.other_option;

  const job = jobApplication.default_job_opening_id
    ? jobApplication.default_job_opening_id
    : jobApplication.job_opening_id;

    console.log("job", job)
    console.log("jobApplication.default_job_opening_id", jobApplication.default_job_opening_id)
    console.log("jobApplication.job_opening_id", jobApplication.job_opening_id)
    console.log("jobApplication_id", jobApplication._id)
  return (
    <div className="row d-flex justify-content-center">
      {/* {jobApplication['rep_sieving_call']?.first_name} */}
      {Object.keys(jobApplication).length &&
        Object.keys(jobApplication)
          .reverse()
          .map((e) => (
            <>
              <div className="col-md-6 ">
                <p className="job-field">
                  {e === 'default_job_opening_id' || e === 'job_opening_id'
                    ? 'Job Opening'
                    : e.split('_').join(' ')}
                </p>
              </div>
              <div className="col-md-6 ">
                {e === 'default_job_opening_id' || e === 'job_opening_id' ? (
                  <p>{job?.job_title}</p>
                ) : e === 'rep_sieving_call' ? (
                  <p>
                    {jobApplication[e]?.first_name}{' '}
                    {jobApplication[e]?.last_name}
                  </p>
                ) : (
                  <p className="">
                    {typeof jobApplication[e] === 'string' ? (
                      jobApplication[e]
                    ) : jobApplication[e] === null ? (
                      'Not Provided'
                    ) : (
                      <Paper component="ul" className={classes.paper}>
                        {jobApplication[e].map((data) => {
                          let icon;
                          return (
                            <li key={data._id}>
                              <Chip
                                className={classes.chip}
                                icon={icon}
                                label={data}
                              />
                            </li>
                          );
                        })}
                      </Paper>
                    )}
                  </p>
                )}
              </div>
            </>
          ))}
    </div>
  );
};

export default AcademyApplicantsContent;
