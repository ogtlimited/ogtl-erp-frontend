import React from 'react'

const ProfileCards = () => {
    return (
        <>
         <div class="card tab-box">
<div class="row user-tabs">
<div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
<ul class="nav nav-tabs nav-tabs-bottom">
<li class="nav-item"><a href="#emp_profile" data-toggle="tab" class="nav-link active">Profile</a></li>
<li class="nav-item"><a href="#emp_projects" data-toggle="tab" class="nav-link">Projects</a></li>
<li class="nav-item"><a href="#bank_statutory" data-toggle="tab" class="nav-link">Bank &amp; Statutory <small class="text-danger">(Admin Only)</small></a></li>
</ul>
</div>
</div>
</div> 
  {/* <div class="tab-content" >
  <div class="tab-content" >
    
  </div> */}
        </>
    )
}

export default ProfileCards
