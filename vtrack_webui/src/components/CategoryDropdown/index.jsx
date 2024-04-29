import React, { useEffect, useState } from "react";
import { useCategory } from "../../hooks";

const CategoryDropdown = ({ formData, errors, handleChange, submitted }) => {
  const Category = useCategory();

  useEffect(() => {
    Category.getCatergory();
  }, []);

  return (
    <>
      <div className="relative flex flex-col z-0 w-full mb-10 group">
        <label className="text-gray-700">Purpose of Visit:*</label>
        <select
          name="purposeOfVisit"
          value={formData.purposeOfVisit}
          onChange={handleChange}
          className={`border rounded-md p-2 ${errors.purposeOfVisit ? "border-red-500" : ""}`}
        >
          <option value="" disabled>
            Select purpose
          </option>
          {Category.catergoriesData.length !== 0 ? (
            Category.catergoriesData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.visit_purpose}
              </option>
            ))
          ) : (
            <option>No data found</option>
          )}
        </select>
        {submitted && errors.purposeOfVisit && <p className="text-red-500">{errors.purposeOfVisit}</p>}
      </div>
    </>
  );
};

export default CategoryDropdown;
