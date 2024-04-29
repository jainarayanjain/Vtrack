import React from "react";

const AccessCardSelect = ({ value, onChange, options, error }) => {
  return (
    <div className="relative z-0 w-full mb-10 group flex flex-col">
      <label className="text-gray-700">Access Card:*</label>
      <select
        name="tempAccessCard"
        value={value}
        onChange={onChange}
        className={`border rounded-md p-2 ${error ? "border-red-500" : ""}`}
      >
        <option value="" disabled>
          Select Access Card*
        </option>
        {options.map((item) => (
          <option value={item.id} key={item.id}>
            {item.card_number}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};


export default AccessCardSelect;
