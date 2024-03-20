import React, { useState } from "react";
import "./dropdownCheckbox.css";

function DropdownCheckbox({
    office,
    options,
    selectedOptions,
    onSelectionChange,
    errorIndicator,
}) {
    const [isOpen, setIsOpen] = useState(false);
    console.log(office, "option", options)

    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        const updatedSelectedOptions = selectedOptions.includes(+value)
            ? selectedOptions.filter((item) => item !== +value)
            : [...selectedOptions, +value];
        onSelectionChange(updatedSelectedOptions);
        console.log("Selected Office", updatedSelectedOptions)
    };

    return (
        <div className="dropdown_checkbox">
            <button
                onClick={toggleDropdown}
                className={!selectedOptions.length ? errorIndicator : undefined}
            >
                {isOpen ? "Hide" : "Show"} {office}
            </button>
            {isOpen && (
                <div
                    className={`checkbox_options ${!selectedOptions.length ? errorIndicator : undefined
                        }`}
                >
                    {options.map((option) => (
                        <label key={option.value} className="checkbox_input">
                            <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedOptions.includes(option.value)}
                                onChange={handleCheckboxChange}
                                className=""
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownCheckbox;