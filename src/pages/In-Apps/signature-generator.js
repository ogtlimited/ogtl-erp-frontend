import React, {useState} from 'react'

import Signature from './signature';

const getIcon =  (name) => (<i class={"las "+ name}></i> );

const SignatureGenerator = () => {
    const initialState = {
        fullName: "",
        position: "",
        skype: "",
        phone: "",
        photo: "",
        withPhoto: false,
        copied: false,
    };
    const [state, setState] = useState(initialState)
    const photoUrlMaxLength = 1000;
    const handleChange = (event) => {
        if (event.target.name === "withPhoto") {
            setState((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.checked,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
            }));
        }
    };
    const enoughData = () => {
        let progress = 100;
        if (state.withPhoto) {
            if (
                state.fullName &&
                state.phone &&
                state.position &&
                state.skype &&
                state.photo
            ) {
                return (
                    <React.Fragment>
                        <Signature
                            fullName={state.fullName}
                            position={state.position}
                            skype={state.skype}
                            phone={state.phone}
                            photo={state.photo}
                        />
                        <br/>
                        <button
                            disabled={state.photo.length > photoUrlMaxLength}
                            onClick={copyToClipboard}
                            endIcon={state.copied ? getIcon('la-check') : getIcon('la-copy') }
                        >
                            {state.copied ? "Copied" : "Copy to clipboard"}
                        </button>
                    </React.Fragment>
                );
            } else {
                Object.entries(state).forEach(([key, value]) => {
                    if (
                        ["fullName", "phone", "position", "skype", "photo"].includes(key)
                    ) {
                        if (value.length === 0) {
                            progress = progress - 20;
                        }
                    }
                });
            }
        } else {
            if (state.fullName && state.phone && state.position && state.skype) {
                return (
                    <React.Fragment>
                        <Signature
                            fullName={state.fullName}
                            position={state.position}
                            skype={state.skype}
                            phone={state.phone}
                            photo={"no-photo"}
                        />
                        <br/>
                        <button
                            onClick={copyToClipboard}
                            endIcon={state.copied ? getIcon('la-check') : getIcon('la-copy')}
                        >
                            {state.copied ? "Copied" : "Copy to clipboard"}
                        </button>
                    </React.Fragment>
                );
            } else {
                Object.entries(state).forEach(([key, value]) => {
                    if (["fullName", "phone", "position", "skype"].includes(key)) {
                        if (value.length === 0) {
                            progress = progress - 25;
                        }
                    }
                });
            }
        }
        if (progress > 0) {
            return (
                <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            );
        } else {
            return <div>Please, input your data</div>;
        }
    };
    const copyToClipboard = () => {
        let copyText = document.querySelector(".signature");
        const range = document.createRange();
        if (copyText) {
            range.selectNode(copyText);
        }
        const windowSelection = window.getSelection();
        if (windowSelection) {
            windowSelection.removeAllRanges();
            windowSelection.addRange(range);
        }
        try {
            let successful = document.execCommand("copy");
            console.log(successful ? "Success" : "Fail");
            setState((prevState) => ({
                ...prevState,
                copied: true,
            }));
        } catch (err) {
            console.log("Fail");
        }
    };


    return (
        <div class="row">
      <div class="col-sm-12">
        <div class="file-wrap">
          <div class="file-sidebar">
            <div class="file-header justify-content-center">
              <span>Projects</span>
              <a href="" class="file-side-close">
                <i class="fa fa-times"></i>
              </a>
            </div>
         
           
        </div>
        </div>
      </div>
    </div>
    )
}

export default SignatureGenerator
