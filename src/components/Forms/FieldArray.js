import React from "react";
import { useFieldArray } from "react-hook-form";

// eslint-disable-next-line no-unused-vars
let renderCount = 0;

const FieldArray = ({ control, register, setValue, getValues }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  renderCount++;

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <label> single input </label>
              <input
                name={`test[${index}].task`}
                ref={register()}
                defaultValue={item.task}
              />
              <br />
              <label> first Name </label>
              <input
                name={`test[${index}].name.first`}
                ref={register()}
                defaultValue={item.name.first}
              />
              <br />
              <label>last Name </label>
              <input
                name={`test[${index}].name.last`}
                ref={register()}
                defaultValue={item.name.last}
              />
              <br />

              <label>First Nested </label>
              <input
                name={`test[${index}].nestedArray[0].firstNested`}
                ref={register()}
                // defaultValue={item.nestedArray.nested}
              />

              <br />
              <label> Second Nested </label>
              <input
                name={`test[${index}].nestedArray[0].secondNested`}
                ref={register()}
                // defaultValue={item.nestedArray.nested}
              />
              <br />

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: "test" });
          }}
        >
          append
        </button>
      </section>
    </>
  );
};

export default FieldArray;
