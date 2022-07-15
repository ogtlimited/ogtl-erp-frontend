import React from 'react';
import './TicketContent.css';

const TicketContent = ({ticket, manager, update}) => {
  const { _id, content, department, status} = ticket || {};
  const statusStyle = status === 'Open' ? 'alert-info' : (status === 'Processing' ? 'alert-warning' : 'alert-success')
  return (
    <div>
      <p className='ticket-department'>{department?.department}</p>
      {manager &&
        <div>
          <a
            href="#"
            data-toggle="dropdown"
          >
            <p className={`display-status ${statusStyle}`}>{status}</p>
          </a>
          <div className="dropdown-menu dropdown-menu-left">
            <a 
            href="#"
            className="dropdown-item"
            onClick={() => { update(_id, 'Open');}}
            >
              Open
            </a>
            <a 
            href="#"
            className="dropdown-item"
            onClick={() => { update(_id,'Processing');}}
            >
              Processing
            </a>
            <a 
            href="#"
            className="dropdown-item"
            onClick={() => { update(_id, 'Resolved');}}
            >
             Resolved
            </a>
          </div>
        </div>
      }
      <div className='well'>{content}</div>
    </div>
  )
}

export default TicketContent;