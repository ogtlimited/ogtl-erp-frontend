import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import assets from "./assets.json";
import liabilities from "./liabilities.json";
const BalanceSheet = () => {
  const { user } = useAppContext();
  const [prevBalance, setPrevBalance] = useState(
    assets.reduce((a, b) => a.prev_balance + b.prev_balance, 0)
  );
  const [currBalance, setCurrBalance] = useState(
    assets.reduce((a, b) => a.curr_balance + b.curr_balance, 0)
  );
  let cards = [
    {
      title: "Working Capital",
      amount: 1000,
      icon: "las la-hand-holding-usd",
    },
    {
      title: "Current Ratio",
      amount: "25 %",
      icon: "las la-percentage",
    },
    {
      title: "Liquidity Ratio",
      amount: "10%",
      icon: "las la-percent",
    },
    {
      title: "Quick Ratio",
      amount: "33.6%",
      icon: "las la-percentage",
    },
    {
      title: "Debt to Ratio",
      amount: "45.5%",
      icon: "las la-percentage",
    },
    {
      title: "Cash Balance",
      amount: "23,000",
      icon: "las la-percentage",
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Balance Sheet</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.account?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> New Account
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        {cards.slice(0, 4).map((card) => (
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className={card.icon}></i>
                </span>
                <div className="dash-widget-info">
                  <h3> {card.amount}</h3>
                  <span>{card.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-9">
          <div className="card dash-widget">
            <div className="card-body">
              <table className="table balance-sheet">
                <thead>
                  <tr>
                    <th># </th>
                    <th> Line Items </th>
                    <th>Balance in 2021</th>
                    <th>Balance in 2020</th>
                    <th>Difference</th>
                  </tr>
                  <tr>
                    <th scope="col"> 1 </th>
                    <th scope="col"> Assets </th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => {
                    return (
                      <tr>
                        <td></td>
                        <td>{asset.title}</td>
                        <td>{asset.curr_balance}</td>
                        <td>{asset.prev_balance}</td>
                        <td>{asset.curr_balance - asset.prev_balance}</td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td></td>
                    <td>&Sigma; {currBalance}</td>
                    <td>&Sigma; = {prevBalance}</td>
                    <td>10000000</td>
                  </tr>
                  <tr></tr>
                </tbody>
                <thead>
                  <tr>
                    <th> 2 </th>
                    <th> Liabilities </th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {liabilities.map((asset) => {
                    return (
                      <tr>
                        <td></td>
                        <td>{asset.title}</td>
                        <td>{asset.curr_balance}</td>
                        <td>{asset.prev_balance}</td>
                        <td>{asset.curr_balance - asset.prev_balance}</td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td></td>
                    <td>&Sigma; {currBalance}</td>
                    <td>&Sigma; = {prevBalance}</td>
                    <td>10000000</td>
                  </tr>
                  <br />
                  <br />
                </tbody>
                <thead>
                  <tr>
                    <th> 3 </th>
                    <th> Equity </th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Assets</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Total Liabilities</td> <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* <LeavesTable columns={columns} data={accounts} /> */}
        </div>
        <div className="col-md-3">
          {cards.slice(4).map((card) => (
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className={card.icon}></i>
                </span>
                <div className="dash-widget-info">
                  <h3> {card.amount}</h3>
                  <span>{card.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BalanceSheet;
