import React, { useState, useEffect } from "react";
import "./dropdownCheckbox.css";

function DropdownCheckboxOptions({
  office,
  options,
  selectedOptions,
  setSelected,
  closeAll,
  setViewingOffice,
  onSelectionChange,
  errorIndicator,
  valueIsNumber = false
}) {
  const [isOpen, setIsOpen] = useState(false);

  console.log({
    options,
    selectedOptions
  });

  useEffect(() => {
    if (closeAll) {
      setIsOpen(false);
    }

    if (isOpen) {
      setViewingOffice(true);
    } else {
      setViewingOffice(false);
    }
  }, [closeAll, isOpen, setViewingOffice]);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    let updatedSelectedOptions;

    if (value === "all") {
      if (selectedOptions.includes("all")) {
        updatedSelectedOptions = [];
      } else {
        updatedSelectedOptions = options.map((option) => option.value);
      }
    } else {
      const formatedValue = valueIsNumber ? +value : value
      
      updatedSelectedOptions = selectedOptions.includes(formatedValue)
        ? selectedOptions.filter((item) => item !== formatedValue)
        : [...selectedOptions, formatedValue];

      if (selectedOptions.includes("all")) {
        updatedSelectedOptions = updatedSelectedOptions.filter(
          (option) => option !== "all"
        );
      }

      const allSelected = options
        .filter((option) => option.value !== "all")
        .every((option) => updatedSelectedOptions.includes(option.value));
      if (allSelected) {
        updatedSelectedOptions = options.map((option) => option.value);
      }
    }

    onSelectionChange(updatedSelectedOptions);

    const selectedOffices = options
      .filter(
        (option) =>
          updatedSelectedOptions.includes(option.value) &&
          option.value !== "all"
      )
      .map((selectedOption) => ({ ...selectedOption, office }));

    setSelected(selectedOffices);
  };

  const allChecked =
    options.length > 0 && selectedOptions.length === options.length;

  return (
    <div className="dropdown_checkbox">
      <button
        onClick={toggleDropdown}
        className={!selectedOptions.length ? errorIndicator : undefined}
      >
        {isOpen ? "Hide" : "Show"} {office}s
      </button>
      {isOpen && (
        <div
          className={`checkbox_options ${
            !selectedOptions.length ? errorIndicator : undefined
          }`}
        >
          {options.map((option) => (
            <label key={option.value} className="checkbox_input">
              <input
                type="checkbox"
                value={option.value}
                checked={
                  option.value === "all"
                    ? allChecked
                    : selectedOptions.includes(option.value)
                }
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

export default DropdownCheckboxOptions;
