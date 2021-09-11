import React from "react";

const PayrollItems = () => {
  return (
    <>
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Payroll Items</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Payroll Items</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page-menu">
        <div class="row">
          <div class="col-sm-12">
            <ul class="nav nav-tabs nav-tabs-bottom">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#tab_additions"
                >
                  Earnings
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab_deductions">
                  Deductions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane show active" id="tab_additions">
          <div class="text-right mb-4 clearfix">
            <button
              class="btn btn-primary add-btn"
              type="button"
              data-toggle="modal"
              data-target="#add_addition"
            >
              <i class="fa fa-plus"></i> Add Addition
            </button>
          </div>

          <div class="payroll-table card">
            <div class="table-responsive">
              <table class="table table-hover table-radius">
                <thead>
                  <tr>
                    <th>Name</th>
                    
                    <th> Amount</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Leave balance amount</th>
                   
                    <td>₦5</td>
                    <td class="text-right">
                      <div class="dropdown dropdown-action">
                        <a
                          href="#"
                          class="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#edit_addition"
                          >
                            <i class="fa fa-pencil m-r-5"></i> Edit
                          </a>
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_addition"
                          >
                            <i class="fa fa-trash-o m-r-5"></i> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Arrears of salary</th>
                    
                    <td>₦8</td>
                    <td class="text-right">
                      <div class="dropdown dropdown-action">
                        <a
                          href="#"
                          class="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#edit_addition"
                          >
                            <i class="fa fa-pencil m-r-5"></i> Edit
                          </a>
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_addition"
                          >
                            <i class="fa fa-trash-o m-r-5"></i> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Gratuity</th>
                    <td>₦20</td>
                    <td class="text-right">
                      <div class="dropdown dropdown-action">
                        <a
                          href="#"
                          class="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#edit_addition"
                          >
                            <i class="fa fa-pencil m-r-5"></i> Edit
                          </a>
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_addition"
                          >
                            <i class="fa fa-trash-o m-r-5"></i> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="tab-pane" id="tab_deductions">
          <div class="text-right mb-4 clearfix">
            <button
              class="btn btn-primary add-btn"
              type="button"
              data-toggle="modal"
              data-target="#add_deduction"
            >
              <i class="fa fa-plus"></i> Add Deduction
            </button>
          </div>

          <div class="payroll-table card">
            <div class="table-responsive">
              <table class="table table-hover table-radius">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Default/Unit Amount</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Absent amount</th>
                    <td>₦12</td>
                    <td class="text-right">
                      <div class="dropdown dropdown-action">
                        <a
                          href="#"
                          class="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                         <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#edit_deduction"
                          >
                            <i class="fa fa-pencil m-r-5"></i> Edit
                          </a>
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_deduction"
                          >
                            <i class="fa fa-trash-o m-r-5"></i> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Advance</th>
                    <td>₦7</td>
                    <td class="text-right">
                      <div class="dropdown dropdown-action">
                        <a
                          href="#"
                          class="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#edit_deduction"
                          >
                            <i class="fa fa-pencil m-r-5"></i> Edit
                          </a>
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_deduction"
                          >
                            <i class="fa fa-trash-o m-r-5"></i> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Unpaid leave</th>
                    <td>₦3</td>
                    <td class="text-right">
                      <div class="dropdown dropdown-action">
                        <a
                          href="#"
                          class="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#edit_deduction"
                          >
                            <i class="fa fa-pencil m-r-5"></i> Edit
                          </a>
                          <a
                            class="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_deduction"
                          >
                            <i class="fa fa-trash-o m-r-5"></i> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayrollItems;
