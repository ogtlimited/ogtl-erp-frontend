import React, {useEffect, useState} from 'react'
import RecruitmentPageHeader from './PageHeader'
import Stepper from '../../components/Steps/Stepper';
import ConsentForm from './ConsentForm';
import Steps from '../../components/Steps/Steps';
import PersonalInfoForm from './PersonalInfoForm';
import ReviewForm from './ReviewForm';

const Consent = () => {

    const [items, setitems] = useState([
        {
            id: 1,
            title: 'Consent',
            component: <ConsentForm defaultVal={true} id="1" />,
            default: true
        },
        {
            id: 2,
            title: 'Application',
            component: <PersonalInfoForm  defaultVal={false} id="2" />,
            default: false
        },
        {
            id: 3,
            title: 'Review',
            component: <ReviewForm  defaultVal={false} id="2" />,
            default: false
        }
    ])
    useEffect(() => {
            const navButtons = document.querySelectorAll('.nav-button');
            const stepButtons = document.querySelectorAll('.step-button');
        const progress = document.querySelector('#progress');
        console.log(navButtons)
        Array.from(navButtons).forEach((button) => {
            button.addEventListener('click', () => {
                window.scrollTo(0, 0);
                let idx = button.getAttribute('data-target')
                let index = parseInt(idx[idx.length -1])
                console.log(idx[idx.length -1], stepButtons.length)
                console.log(parseInt(idx[idx.length -1]) * 100 /(stepButtons.length))
                progress.setAttribute('value', parseInt(idx[idx.length -1]) * 100 /(stepButtons.length ) );//there are 3 buttons. 2 spaces.
        
                stepButtons.forEach((item, secindex)=>{
                    console.log(index, 'sec', secindex)
                    if(index > secindex){
                        item.classList.add('done');
                    }
                    if(index <= secindex){
                        item.classList.remove('done');
                    }
                })
            })
        })
       
    }, [])
    return (
        <>
             <RecruitmentPageHeader />
             <div class="row justify-content-center">
<div class="accordion col-md-11" id="accordionExample">
<Stepper controls={items} />
<Steps items={items} />


</div>
</div>
        </>
    )
}

export default Consent
