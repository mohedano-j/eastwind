import productReducer from "./productReducer";
import * as actions from "../actions/productActions";

it("should add product when passed PRODUCT_ADD_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      productName: "A"
    },
    {
        productName: "B"
    }
  ];

  const newProduct = {
    productName: "C"
  };

  const action = actions.productAddSuccess(newProduct);

  // act
  const newState = productReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].productName).toEqual("A");
  expect(newState[1].productName).toEqual("B");
  expect(newState[2].productName).toEqual("C");
});

it("should update course when passed PRODUCT_EDIT_SUCCESS", () => {
  // arrange
  const initialState = [
    { productId: 1, productName: "A" },
    { productId: 2, productName: "B" },
    { productId: 3, productName: "C" }
  ];

  const product = { productId: 2, productName: "New Product Name" };
  const action = actions.productEditSuccess(product);

  // act
  const newState = productReducer(initialState, action);
  const updatedCourse = newState.find((a: { productId: number; }) => a.productId == product.productId);
  const untouchedCourse = newState.find((a: { productId: number; }) => a.productId == 1);

  // assert
  expect(updatedCourse.productName).toEqual("New Product Name");
  expect(untouchedCourse.productName).toEqual("A");
  expect(newState.length).toEqual(3);
});