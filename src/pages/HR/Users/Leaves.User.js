import React,{useState, useEffect} from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import tokenService from "../../../services/token.service";
import axiosInstance from "../../../services/api";
import FormModal from "../../../components/Modal/Modal";
import { LeaveApplicationFormJSON } from "../../../components/FormJSON/HR/Leave/application";
import { useAppContext } from "../../../Context/AppContext";
import FormModal2 from "../../../components/Modal/FormModal2";
import helper from "../../../services/helper";
const LeavesUser = () => {
  const {allEmployees, combineRequest, showAlert} = useAppContext();
  const [userId, setuserId] = useState('')
  const [template, settemplate] = useState(null);
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [allLeaves, setallLeaves] = useState([])
  const [annual, setannual] = useState(0);
  const [casual, setcasual] = useState(0);
  const [medical, setmedical] = useState(0)
  const [remaining, setremaining] = useState(0);
  const [formMode, setformMode] = useState('add')
  const [fetched, setfetched] = useState(false)
  const [loadedSelect, setloadedSelect] = useState(false)
  const [loadLeaves, setloadLeaves] = useState(false)
  const fetchLeaves = () =>{
    axiosInstance.get('/leave-application').then(e =>{
      console.log(userId, 'USERID')
      const leaves = e.data.data.filter(f => f.employee_id._id == userId);
      const casual = leaves.filter(e => e.leave_type_id !== 'Sick').length;
      const medic = leaves.filter(e => e.leave_type_id === 'Sick').length;
      const open = leaves.filter(l => l.status === 'open').length;
      setannual(annual);
      setcasual(casual);
      setmedical(medic)

      console.log('LEAVES', leaves)
      setallLeaves(leaves)
      if(allLeaves.length){
        setloadLeaves(true)
      }
      console.log(leaves)
      console.log(userId)

    })
  }
 useEffect(() => {
  let user = tokenService.getUser()
    setuserId(user._id)
    if(userId){
      fetchLeaves()
    }
    console.log(userId)
 }, [userId])
  useEffect(() => {
    if (!fetched) {
      console.log('FETCHED')
      fetchLeaves();
    }
  }, [allEmployees, fetched]);

  useEffect(() => {
   console.log(formValue, submitted)
   if(submitted){
    axiosInstance.post('/leave-application', formValue).then( e =>{
      console.log(e)
      showAlert(true, e?.data.message, "alert alert-success");
    }).catch(err =>{
      showAlert(true, err?.data.message, "alert alert-danger");
    })
   }
  }, [formValue, submitted])
  useEffect(() => {
    // console.log(allEmployees)
    const employeeOpts = allEmployees.map((e) => {
      return {
        value: e._id,
        label: e.first_name + " " + e.last_name,
      };
    });
    const finalForm = LeaveApplicationFormJSON.Fields.map((field) => {
      if (field.name === "employee_id") {
        field.options = employeeOpts;
        return field;
      }
      return field;
    });
    // console.log(finalForm)
    settemplate({
      title: LeaveApplicationFormJSON.title,
      Fields: finalForm,
    });
    console.log(template)
    if(template !== null){
      setloadedSelect(true)
      console.log('loaded')

    }
    // console.log(template)
  }, [allEmployees, loadedSelect]);
  const columns = [
    {
      dataField: "leave_type_id",
      text: "Leave Type",
      sort: true,
      // headerStyle: {minWidth: "100px"},
      
    },
    {
        dataField: "from_date",
        text: "From Date",
        sort: true,
        formatter: (val, row) =>(
          <p>{new Date(val).toDateString()}</p>
        )
      //   filter: dateFilter({
      //     style: { display: 'flex' },
      //     getFilter: (filter) => {
      //         attendanceDateFilter = filter;
      //     }
      //   }),
        // headerStyle: {minWidth: "150px"},
      },
      {
        dataField: "to_date",
        text: "To Date",
        sort: true,
        formatter: (val, row) =>(
          <p>{new Date(val).toDateString()}</p>
        )

      },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,

      // headerStyle: {minWidth: "100px", textAlign:'center'},

    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      // headerStyle: {minWidth: "120px"},
      formatter: (value, row) => (
          <>
           {value === 'approved' ?
                <span className="btn btn-gray btn-sm btn-rounded"
                ><i className="fa fa-dot-circle-o text-success"></i> {value}</span>
             : value === 'cancelled' ?
             <span className="btn btn-gray btn-sm btn-rounded"
             ><i className="fa fa-dot-circle-o text-danger"></i> {value}</span>

             : value === 'open' ?
             <span className="btn btn-gray btn-sm btn-rounded "
            ><i className="fa fa-dot-circle-o text-primary"></i> {value}</span>
             :
             <span className="btn btn-gray btn-sm btn-rounded"><i className="fa fa-dot-circle-o text-purple"></i> Approved</span>}

        </>
        ),

    },
    {
      dataField: "leave_approver",
      text: "Approved by",
      sort: true,
      // headerStyle: {minWidth: "80px", textAlign:'center'},

    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leaves</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Leaves</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            
          <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              onClick={() => setformMode('add')}
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Leave
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="stats-info">
            <h6>Total Allocated Leave</h6>
            <h4>20</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-info">
            <h6>Medical Leave</h6>
            <h4>{medical}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-info">
            <h6>Other Leave</h6>
            <h4>{casual}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-info">
            <h6>Remaining Leave</h6>
            <h4>{20 - medical - casual}</h4>
          </div>
        </div>
      </div>
      <div className="row">
          <div className="col-12">
          <LeavesTable columns={columns} data={allLeaves} />
          </div>
      </div>
      {loadedSelect ? 
      <>
       <FormModal2
        title="Leave Application"
        editData={editData}
        setformValue={setformValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setsubmitted}
      />
      </> : null
      }
    </>
  );
};

export default LeavesUser;
