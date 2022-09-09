/** @format */

import '../../assets/css/PublicHoliday.css';
import React from 'react';
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
    padding: theme.spacing(1),
    marginTop: 5,
    marginBottom: 10,
    maxWidth: '100%',
    maxHeight: 130,
    overflow: 'hidden',
    overflowY: 'scroll',
  },
}));

function PublicHolidayModal({ closeModal }) {
  const classes = useStyles();
  const [PublicHoliday, setPublicHoliday] = React.useState(PUBLIC_HOLIDAY);

  const [department, setDepartment] = React.useState('');
  const [project, setProject] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [chipData, setChipData] = React.useState([]);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // onChange Event
  const handleFormChange = (e) => {
    e.preventDefault();
    setPublicHoliday({ ...PublicHoliday, [e.target.name]: e.target.value });
  };

  // Delete Campaign Chips
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  // onSubmit Event
  const submitPublicHoliday = (e) => {
    e.preventDefault();
    console.log(PublicHoliday);
    setPublicHoliday(PUBLIC_HOLIDAY);
    closeModal(false);
  };

  return (
    <>
      <div className="public-holiday-modal">
        <div className="public-holiday-modal-container">
          <RiCloseCircleFill
            className="public-holiday-modal-close"
            onClick={() => closeModal(false)}
          />
          <div className="public-holiday-modal-info">
            <form
              className="public-holiday-form-area"
              onSubmit={submitPublicHoliday}
            >
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
              <Paper component="ul" className={classes.root}>
                {chipData.map((data) => {
                  let icon;
                  return (
                    <li key={data.key}>
                      <Chip
                        icon={icon}
                        label={data.label}
                        onDelete={handleDelete(data)}
                        id="pub-hol-chip"
                      />
                    </li>
                  );
                })}
              </Paper>

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
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={department}
                    onChange={handleDepartmentChange}
                    onClick={() =>
                      setChipData([
                        ...chipData,
                        { key: chipData.length, label: department },
                      ])
                    }
                  >
                    <MenuItem value={'HR'}>HR</MenuItem>
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                    <MenuItem value={'Employee'}>Employee</MenuItem>
                    <MenuItem value={'SUPER'}>SUPER</MenuItem>
                  </Select>
                </FormControl>
              
              <Button
                id="public-holiday-button"
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicHolidayModal;
