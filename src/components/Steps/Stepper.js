import React from 'react'

const Stepper = ({controls}) => {
    return (
        <div className="steps">
    <progress id="progress" value="0" max="100" ></progress>
    {controls && controls.map(control =>(
        <div className="step-item">
            <button className="step-button text-center" type="button" data-toggle="collapse"
                 aria-expanded={control.default} aria-controls={"collapse" + control.id}>
                {control.id}
            </button>
            <div className="step-title">
                {control.title}
            </div>
        </div>

    ))}
    {/* <div className="step-item">
        <button className="step-button text-center collapsed" type="button" data-toggle="collapse"
            data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            2
        </button>
        <div className="step-title">
            Second Step
        </div>
    </div>
    <div className="step-item">
        <button className="step-button text-center collapsed" type="button" data-toggle="collapse"
            data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            3
        </button>
        <div className="step-title">
            Third Step
        </div>
    </div> */}
</div>
    )
}

export default Stepper
