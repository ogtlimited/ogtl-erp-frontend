import React from 'react'

const ScoreCards = () => {
    return (
        <>
           <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Perfomance</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Score Cards</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
             
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Score Card
            </a>
          </div>
        </div>
      </div>
       
        </>
    )
}

export default ScoreCards
