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

const ClientProjectContent = ({ clientProject = {} }) => {
  console.log('show this modal', clientProject);

  delete clientProject.updatedAt;
  delete clientProject.createdAt;
  delete clientProject.__v;
  delete clientProject._id;

  return (
    <div className="row d-flex justify-content-center">
      {/* {clientProject['rep_sieving_call']?.first_name} */}
      {Object.keys(clientProject).length &&
        Object.keys(clientProject)
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
                  {
                    /* <p>{job?.job_title}</p> */
                  }
                ) : e === 'rep_sieving_call' ? (
                  <p>
                    {clientProject[e]?.first_name} {clientProject[e]?.last_name}
                  </p>
                ) : (
                  <p className="">
                    {typeof clientProject[e] === 'string'
                      ? clientProject[e]
                      : clientProject[e] === null
                      ? 'Not Provided'
                      : "None"}
                  </p>
                )}
              </div>
            </>
          ))}
    </div>
  );
};

export default ClientProjectContent;
