import React, { useState } from "react";

function DropdownCheckbox({
  options,
  selectedOptions,
  errorIndicator,
  onSelectionChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const updatedSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((item) => item !== value)
      : [...selectedOptions, value];
    onSelectionChange(updatedSelectedOptions);
  };

  return (
    <div className="dropdown_checkbox">
      <button
        onClick={toggleDropdown}
        className={!selectedOptions.length ? errorIndicator : undefined}
      >
        {isOpen ? "Hide" : "Show"} reasons
      </button>
      {isOpen && (
        <div
          className={`checkbox_options ${
            !selectedOptions.length ? errorIndicator : undefined
          }`}
        >
          {options.map((option) => (
            <label key={option.id} className="checkbox_input">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={handleCheckboxChange}
              />
              {option.value}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownCheckbox;
