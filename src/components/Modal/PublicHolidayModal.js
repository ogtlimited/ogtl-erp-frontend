/** @format */

import '../../assets/css/PublicHoliday.css';
import React, { useState, useEffect } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import moment from 'moment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { PUBLIC_HOLIDAY } from '../FormJSON/PublicHoliday';
import { PublicHolidayValidation } from '../../utils/PublicHolidayValidation';

// Material UI styles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    maxWidth: '100%',
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    marginTop: 5,
    marginBottom: 10,
    maxWidth: '100%',
    maxHeight: 100,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
}));

function PublicHolidayModal({ closeModal }) {
  const classes = useStyles();
  const [error, setError] = useState('');

  // Unique tracker for each dataChip
  const [tracker, setTracker] = useState([]);

  // Public Holiday data
  const [PublicHoliday, setPublicHoliday] = useState(PUBLIC_HOLIDAY);

  // eslint-disable-next-line no-unused-vars
  const [department, setDepartment] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [project, setProject] = useState('');

  // Select dropdown State
  const [open, setOpen] = useState(false);

  // Chips for department and project
  const [chipData, setChipData] = React.useState([]);

  // State for switching between department and project
  const [departmentChecked, setDepartmentChecked] = useState(false);
  const [departmentShow, setDepartmentShow] = useState(false);
  const [projectChecked, setProjectChecked] = useState(false);
  const [projectShow, setProjectShow] = useState(false);

  //  Setting department active and project inactive
  const toggleDepartment = () => {
    setDepartmentChecked(!departmentChecked);
    setDepartmentShow(!departmentShow);
    setProjectShow(false);
    setProjectChecked(false);
  };
  //  Setting project active and department inactive
  const toggleProject = () => {
    setProjectChecked(!projectChecked);
    setProjectShow(!projectShow);
    setDepartmentShow(false);
    setDepartmentChecked(false);
  };

  //  Enable department to be selected
  const handleDepartmentChange = (event) => {
    const { value } = event.target;
    setDepartment((prevState) => ({ ...prevState, value }));
  };
  // Enable project to be selected
  const handleProjectChange = (event) => {
    const { value } = event.target;
    setProject((prevState) => ({ ...prevState, value }));
  };

  //  Open and close the select input
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  //  Add Unique department and project chips
  const handleAddChip = (e) => {
    e.preventDefault();
    if (
      e.target.value !== 0 &&
      !tracker.includes(e.target.value) &&
      tracker.length !== undefined
    ) {
      setChipData((prevState) => [
        ...prevState,
        { id: chipData.length, label: e.target.value },
      ]);
      setTracker((prevState) => [...prevState, e.target.value]);
    }
  };

  // Delete Campaign Chips
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
    setTracker((prevState) =>
      prevState.filter((item) => item !== chipToDelete.label)
    );
  };

  // Form onChange Event
  const handleFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPublicHoliday((prevState) => ({ ...prevState, [name]: value }));
  };

  // Form onSubmit Event
  const submitPublicHoliday = (e) => {
    e.preventDefault();
    if (PublicHolidayValidation(PublicHoliday)) {
      return setError('Please fill all fields');
    }
    PUBLIC_HOLIDAY.campaign.push(...chipData);
    console.log('This is the submitted data', PublicHoliday); // Substitute the console.log with the API call to [POST] public holiday
    setPublicHoliday(PUBLIC_HOLIDAY);
    setError('');
    closeModal(false);
  };

  useEffect(() => {
    PublicHoliday.campaign = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="public-holiday-modal">
        <div className="public-holiday-modal-container">
          {error && <p className="ph-error">{error}</p>}
          <RiCloseCircleFill
            className="public-holiday-modal-close"
            onClick={() => closeModal(false)}
          />
          <div className="public-holiday-modal-info">
            <form
              className="public-holiday-form-area"
              onSubmit={submitPublicHoliday}
            >
              {/* Title Start */}
              <div className="public-holiday-entry-div public-holiday-title-div">
                <input
                  className="public-holiday-input"
                  type="text"
                  name="title"
                  placeholder="TITLE"
                  value={PublicHoliday.title}
                  onChange={handleFormChange}
                />
                <label htmlFor="title" className="public-holiday-label">
                  TITLE
                </label>
              </div>
              {/* Title End */}

              {/* Start Date End */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="START DATE"
                  format="yyyy-MM-dd"
                  value={PublicHoliday.start_date}
                  onChange={(date) => {
                    setPublicHoliday({
                      ...PublicHoliday,
                      start_date: moment(date).format('YYYY-MM-DD'),
                    });
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              {/* Start Date End */}

              {/* End Date End */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="END DATE"
                  format="yyyy-MM-dd"
                  value={PublicHoliday.end_date}
                  onChange={(date) => {
                    setPublicHoliday({
                      ...PublicHoliday,
                      end_date: moment(date).format('YYYY-MM-DD'),
                    });
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              {/* End Date End */}

              {/* Pills Start */}
              <Paper component="ul" className={classes.root}>
                {chipData.map((data) => {
                  let icon;
                  return (
                    <Chip
                      icon={icon}
                      label={data.label}
                      key={data.id}
                      onDelete={handleDelete(data)}
                      id="pub-hol-chip"
                    />
                  );
                })}
              </Paper>
              {/* Pills End */}

              {/* Checkbox Start */}
              <div className="department-project-div">
                <div className="department-checkbox">
                  <label>Department</label>
                  <input
                    type="checkbox"
                    checked={departmentChecked}
                    onChange={(e) =>
                      setDepartmentChecked(e.target.departmentChecked)
                    }
                    onClick={toggleDepartment}
                  />
                </div>
                <div className="project-checkbox">
                  <label>Project</label>
                  <input
                    type="checkbox"
                    checked={projectChecked}
                    onChange={(e) => setProjectChecked(e.target.projectChecked)}
                    onClick={toggleProject}
                  />
                </div>
              </div>
              {/* Checkbox End */}

              {/* Department-Project Select Start */}
              {departmentShow ? (
                <FormControl className={classes.formControl}>
                  <InputLabel
                    htmlFor="department"
                    id="demo-controlled-open-select-label"
                  >
                    DEPARTMENT
                  </InputLabel>
                  <Select
                    name="department"
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    value={PublicHoliday.department}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    onChange={handleDepartmentChange}
                    onClick={handleAddChip}
                  >
                    <MenuItem value={'HR'}>HR</MenuItem>
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                    <MenuItem value={'Employee'}>Employee</MenuItem>
                    <MenuItem value={'SUPER'}>SUPER</MenuItem>
                  </Select>
                </FormControl>
              ) : projectShow ? (
                <FormControl className={classes.formControl}>
                  <InputLabel
                    htmlFor="department"
                    id="demo-controlled-open-select-label"
                  >
                    PROJECT
                  </InputLabel>
                  <Select
                    name="department"
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    value={PublicHoliday.project}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    onChange={handleProjectChange}
                    onClick={handleAddChip}
                  >
                    <MenuItem value={'OGTL-ERP'}>OGTL-ERP</MenuItem>
                    <MenuItem value={'EAS'}>EAS</MenuItem>
                    <MenuItem value={'Wax'}>Wax</MenuItem>
                    <MenuItem value={'Easy Pay'}>Easy pay</MenuItem>
                  </Select>
                </FormControl>
              ) : null}
              {/* Department-Project Select End */}

              {/* Submit Button Start */}
              <Button
                id="public-holiday-button"
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
              {/* Submit Button End */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicHolidayModal;
