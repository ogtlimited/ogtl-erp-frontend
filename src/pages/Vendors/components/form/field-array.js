import React from "react";
import { useFieldArray } from "react-hook-form";

export const FieldArray = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productItems",
  });
  return (
    <div>
      <tbody>
        {fields.map((item, index) => {
          return (
            <tr>
              <td>
                <div className="form-group">
                  <input
                    name={`productItems[${index}]`}
                    defaultValue={`${item}`}
                    className="form-control "
                    type="text"
                    key={item.id}
                    {...register(`productItems.${index}`)}
                  />
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div className="form-group">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <button
          className="btn btn-sm"
          onClick={() => {
            append();
          }}
        >
          Add
        </button>
      </tfoot>
    </div>
  );
};
