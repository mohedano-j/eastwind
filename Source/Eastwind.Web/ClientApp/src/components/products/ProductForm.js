import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/Form/TextInput";
import SelectInput from "../common/Form/SelectInput";


const productForm = ({
  product,
  categories,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{product.productId ? "Edit" : "Add"} Product</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="productName"
        label="Name"
        value={product.productName|| ""}
        onChange={onChange}
        error={errors.productName}
      />

      <SelectInput
        name="categoryId"
        label="Category"
        value={product.categoryId|| ""}
        defaultOption="Select Category"
        options={categories.map(category => ({
          value: category.categoryId,
          text: category.categoryName
        }))}
        onChange={onChange}
        error={errors.categoryId}
      />

      <TextInput
        name="unitPrice"
        label="Unit Price"
        value={product.unitPrice|| ""}
        onChange={onChange}
        error={errors.unitPrice}
      />

        <TextInput
        name="unitsInStock"
        label="Units In Stocks"
        value={product.unitsInStock|| ""}
        onChange={onChange}
        error={errors.unitsInStock}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

productForm.propTypes = {
  categories: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default productForm;
