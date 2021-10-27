import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/charts/dashboard-stats";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";
import { formatter } from "../../services/numberFormatter";
import moment from "moment";
import { chartOfAccountsFormJson } from "../../components/FormJSON/Accounting/charts-of-account";
import { useAppContext } from "../../Context/AppContext";
import FormModal2 from "../../components/Modal/FormModal2";
import helper from "../../services/helper";
import chartofaccounts from "../../db/chartofaccounts.json";
import InvoiceModal from "../../components/Modal/invoiceModal";
import { NOT_LOCAL_BINDING } from "@babel/types";

const ChartOfAccounts = () => {
  const [data, setData] = useState([]);
  const [accountReceivable, setAccountReceivable] = useState(0);
  const [accountPayable, setAccountPayable] = useState(0);
  const [bank, setBank] = useState(0);
  const [formValue, setFormValue] = useState(null);
  const [accounts, setAccounts] = useState();
  const [editData, seteditData] = useState(null);
  const { showAlert, isChecked, setIsChecked } = useAppContext();
  const [template, setTemplate] = useState(chartOfAccountsFormJson);
  const [submitted, setSubmitted] = useState(false);
  const keys_to_keep = ['_id', 'account_name'];

  const columns = [
    {
      dataField: "type",
      text: "Account Type",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "account_name",
      text: "Account Name",
      sort: true,
      headerStyle: { width: "300px" },
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "account_number",
      text: "Account Number",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => (
        <>
          {row.balance.length > 0 ? (
            <a href="#" className="">
              View Register
            </a>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];
  let cards = [
    {
      title: "Account Payables",
      amount: accountPayable,
      icon: "las la-hand-holding-usd",
    },
    {
      title: "Account Receivables",
      amount: accountReceivable,
      icon: "las la-money-bill-wave-alt",
    },
    {
      title: "Bank",
      amount: bank,
      icon: "las la-coins",
    },
    {
      title: "Invoices",
      amount: "23,000",
      icon: "las la-file-invoice-dollar",
    },
  ];
  const checkbox = [
    {
      name: "is_group",
      type: "check",
      title: "Is Group",
      value: isChecked
    }
  ]
  const otherFields = [
    {
      name: "currency",
      type: "select",
      title: "Currency",
      options: [
        {
          value: "NGN",
          label: "NGN"
        },
        {
          value: "USD",
          label: "USD"
        },
        {
          value: "GPB",
          label: "GPB"
        },
      ]
    },
    {
      name: "account_number",
      type: "text",
      title: "Account Number",
      required: {
        value: true,
        message: "Account Number is required",
      },
    }
  ]

  const dynamicOptions = (formJson, accounts) => {
    let arr = formJson
    let fields = formJson.Fields
    let options = []
    for(let i=0; i<fields.length; i++){
      if(fields[i].type === "select"){
        fields[i].options = accounts
      }
    }

    setTemplate({...arr, "Fields": fields})
  }

  

  const redux = array => array.map(o => keys_to_keep.reduce((acc, curr) => {
    acc[curr] = o[curr];
    return acc;
  }, {}));

  const getDescendant = () => {
    axiosInstance
    .get("/api/account/descendants/616364e9e53c425c741b3fae")
    .then((res) => {
      let result = res.data.data.filter(ele => ele.is_group === false).reduce((a, b) => a + b.balance, 0)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const fetchAccounts = () => {
    axiosInstance
    .get("/api/account")
    .then((res) => {
      let arr = res.data.data.filter((ele) => {
        if(ele.slug === "account-receivable"){
          setAccountReceivable(ele.balance)
        } else if(ele.slug === "account-payable"){
          setAccountPayable(ele.balance)
        } else if(ele.slug === "cash"){
          setBank(ele.balance)
        }
        return ele.is_group === true
      })

      let accounts = res.data.data.filter((ele) => {
        return ele.is_group === false
      })

      accounts.map(ele => {
        ele["type"] = ele.ancestors[0].slug
      })
      
      let reducedArr = redux(arr)

      reducedArr.map(obj => {
        Object.keys(obj).map( key => {
          if (key.match('_id')){
              obj['value'] = obj[key];
              delete obj[key];
          } else if(key.match('account_name')){
              obj['label'] = obj[key];
              delete obj[key];
          }
        })
      })
      
      setData(reducedArr);
      setAccounts(accounts)
      dynamicOptions(template, reducedArr)
      getDescendant()
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    fetchAccounts()
  }, [])

  //create new client
  useEffect(() => {
    if (formValue) {
      if (!editData) {
        
        formValue["is_default"] = false
        formValue["balance"] = 0
        axiosInstance
          .post("/api/account", formValue)
          .then((res) => {
            setFormValue(null);
            fetchAccounts();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      } else {
        // formValue._id = editData._id;
        // delete formValue.__v
        // delete formValue._id
        // delete formValue.createdAt
        // delete formValue.updatedAt
        // axiosInstance
        //   .patch("/api/client/" + editData._id, formValue)
        //   .then((res) => {
        //     setFormValue(null);
        //     fetchClient();
        //     showAlert(true, res.data.message, "alert alert-success");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     setFormValue(null);
        //     showAlert(true, error.response.data.message, "alert alert-danger");
        //   });
      }
    }
  }, [formValue, editData]);

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Chart of Accounts</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> New Account
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        {cards.map((card) => (
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="card dash-widget">
              <div class="card-body">
                <span class="dash-widget-icon">
                  <i class={card.icon}></i>
                </span>
                <div class="dash-widget-info">
                  <h3>${card.amount}</h3>
                  <span>{card.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={accounts} />
        </div>
      </div>
      { isChecked ? (
        <FormModal2
        title="Create New Account"
        editData={editData }
        setformValue={setFormValue }
        template={helper.formArrayToObject(template.Fields.concat(checkbox))}
        setsubmitted={setSubmitted}
      />
      ) : (
        <FormModal2
        title="Create New Account"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(otherFields.concat(template.Fields.concat(checkbox)))}
        setsubmitted={setSubmitted}
      />
      ) }
      
    </>
  );
};

export default ChartOfAccounts;
