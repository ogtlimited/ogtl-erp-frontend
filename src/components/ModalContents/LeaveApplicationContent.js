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

const LeaveApplicationContent = ({ leaveContent = {} }) => {
  console.log('show this modal', leaveContent);

  // delete leaveContent.updatedAt;
  // delete leaveContent.createdAt;
  // delete leaveContent.__v;
  // delete leaveContent._id;

  return (
    <div className="row d-flex justify-content-center">
      {/* {leaveContent['rep_sieving_call']?.first_name} */}
      {Object.keys(leaveContent).length &&
        Object.keys(leaveContent)
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
                    {leaveContent[e]?.first_name} {leaveContent[e]?.last_name}
                  </p>
                ) : (
                  <p className="">
                    {typeof leaveContent[e] === 'string'
                      ? leaveContent[e]
                      : leaveContent[e] === null
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

export default LeaveApplicationContent;
