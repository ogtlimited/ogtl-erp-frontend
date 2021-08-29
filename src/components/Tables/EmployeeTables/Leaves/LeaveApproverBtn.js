import React from 'react'

const LeaveApproverBtn = ({row, value}) => {
    return (
        <>
        <div class="dropdown action-label text-center">
        {value == 'Approved' ? 
                <a class="btn btn-gray btn-sm btn-rounded dropdown-toggle" href="#"
                data-toggle="dropdown" aria-expanded="false"><i class="fa fa-dot-circle-o text-success"></i> {value}</a>
             : value == 'Cancelled' ? 
             <a class="btn btn-gray btn-sm btn-rounded dropdown-toggle" href="#"
             data-toggle="dropdown" aria-expanded="false"><i class="fa fa-dot-circle-o text-danger"></i> {value}</a> : 
             <a class="btn btn-gray btn-sm btn-rounded dropdown-toggle" href="#"
        data-toggle="dropdown" aria-expanded="false"><i class="fa fa-dot-circle-o text-purple"></i> Approved</a>}

    <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end"
        style={{position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(106px, 31px, 0px)'}}>
        <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-purple"></i> Open</a><a class="dropdown-item"
            href="#"><i class="fa fa-dot-circle-o text-info"></i> Rejected</a><a class="dropdown-item" href="#"
            data-toggle="modal" data-target="#approve_leave"><i class="fa fa-dot-circle-o text-success"></i>
            Approved</a><a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-danger"></i> Cancelled</a>
    </div>
    </div>
        </>
    )
}

export default LeaveApproverBtn
