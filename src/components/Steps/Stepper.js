import React from 'react'

const Stepper = ({controls}) => {
    return (
        <div class="steps">
    <progress id="progress" value="0" max="100" ></progress>
    {controls && controls.map(control =>(
        <div class="step-item">
            <button class="step-button text-center" type="button" data-toggle="collapse"
                 aria-expanded={control.default} aria-controls={"collapse" + control.id}>
                {control.id}
            </button>
            <div class="step-title">
                {control.title}
            </div>
        </div>

    ))}
    {/* <div class="step-item">
        <button class="step-button text-center collapsed" type="button" data-toggle="collapse"
            data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            2
        </button>
        <div class="step-title">
            Second Step
        </div>
    </div>
    <div class="step-item">
        <button class="step-button text-center collapsed" type="button" data-toggle="collapse"
            data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            3
        </button>
        <div class="step-title">
            Third Step
        </div>
    </div> */}
</div>
    )
}

export default Stepper
