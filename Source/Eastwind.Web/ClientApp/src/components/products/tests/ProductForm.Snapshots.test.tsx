import React from "react";
import ProductForm from "../ProductForm";
import renderer from "react-test-renderer";
import { products,categories } from "../../../tools/mockData";

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <ProductForm
      product={products[0]}
      categories={categories}
      onSave={jest.fn()}
      onChange={jest.fn()}
      onCancel={jest.fn()}
      errors={[]}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <ProductForm
      product={products[0]}
      categories={categories}
      onSave={jest.fn()}
      onChange={jest.fn()}
      onCancel={jest.fn()}
      errors={[]}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});