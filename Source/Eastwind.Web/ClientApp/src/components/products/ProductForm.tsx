import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/Form/TextInput";
import SelectInput from "../common/Form/SelectInput";
import { Product } from "../../Entities/product";
import { Category } from "../../Entities/category";

type propsType = {
  product: Product;
  categories: Array<Category>;
  onSave: any;
  onCancel: any;
  onChange: any;
  saving: boolean;
  errors: any;
};

const ProductForm = ({
  product,
  categories,
  onSave,
  onCancel,
  onChange,
  saving = false,
  errors = {}
}: propsType) => {
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
        value={product.productName || ""}
        onChange={onChange}
        error={errors.productName}
      />

      <SelectInput
        name="categoryId"
        label="Category"
        value={product.categoryId || ""}
        defaultOption="Select Category"
        options={categories.map(category => ({
          value: category.categoryId,
          text: category.categoryName
        }))}
        onChange={onChange}
        error={errors.category}
      />

      <TextInput
        name="unitPrice"
        label="Unit Price"
        value={product.unitPrice || ""}
        onChange={onChange}
        error={errors.unitPrice}
      />

      <TextInput
        name="unitsInStock"
        label="Units In Stocks"
        value={product.unitsInStock || ""}
        onChange={onChange}
        error={errors.unitsInStock}
      />
      <div>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save"}
        </button>
        <button onClick={onCancel} className="btn btn-light ml-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
