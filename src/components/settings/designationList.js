import React, {useState, useEffect} from "react";


const DesignationList = ({setrole, allDesignation}) => {
    const [activeId, setActiveId] = useState();
    useEffect(() => {
        if(allDesignation.length){
            setActiveId(allDesignation[0]._id)
        }
    }, [allDesignation])
  return (
    <>
      <div class="col-sm-4 col-md-4 col-lg-4 col-xl-3">
        <a
          href="#"
          class="btn btn-primary btn-block"
          data-toggle="modal"
          data-target="#add_role"
        >
          <i class="fa fa-plus"></i> Add Roles
        </a>
        <div class="roles-menu">
          <ul>
              {allDesignation && allDesignation.map(d =>(
                   <li onClick={() => {
                    setActiveId(d._id)
                    setrole(d)
                   }} class= {activeId === d._id ? "active" : ""}>
                   <a href="javascript:void(0);">
                     {d.designation}
                     <span class="role-action">
                       <span
                         class="action-circle large"
                         data-toggle="modal"
                         data-target="#edit_role"
                       >
                         <i class="las la-pencil-alt"></i>
                       </span>
                       <span
                         class="action-circle large delete-btn"
                         data-toggle="modal"
                         data-target="#delete_role"
                       >
                         <i class="las la-trash-alt"></i>
                       </span>
                     </span>
                   </a>
                 </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DesignationList;
