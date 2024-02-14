import React, { useEffect, useState } from "react";
import { useCategory } from "../../hooks";
import { useAppSelector } from "../../hooks";

const CategoryDropdown = ({ formData, errors, handleChange, submitted }) => {
  const Category = useCategory();
  const selector = useAppSelector((state) => state.visitor.visitorData);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    Category.getCatergory();
  }, []);

  useEffect(() => {
    // Filter categories based on your condition
    const filteredData = filterDataByCategory(Category?.catergoriesData, selector.visitorType);
    setFilteredCategories(filteredData);
  }, [selector, Category?.catergoriesData]);

  // Function to filter data based on the category
  const filterDataByCategory = (categoriesData, visitorType) => {
    // if (!categoriesData || !selector) return [];
    const category = visitorType; // Replace with the actual button content
    return categoriesData.filter((item) => item.name?.toLowerCase() === category?.toLowerCase());
  };

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
          {filteredCategories.length !== 0 ? (
            filteredCategories.map((item) => (
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
