import React from "react";
import { mount } from "enzyme";
import { products, newProduct, categories} from "../../tools/mockData";
import { ManageProductPage } from "./ManageProductPage";


function render(args: any) {
    const defaultProps = {
      products,
      categories,
      // Passed from React Router in real app, so just stubbing in for test.
      // Could also choose to use MemoryRouter as shown in NavMenu.test.tsx,
      // or even wrap with React Router, depending on whether I
      // need to test React Router related behavior.
      history: {},
      saveCourse: jest.fn(),
      loadAuthors: jest.fn(),
      loadCourses: jest.fn(),
      product: newProduct,
      match: {}
    };
  
    const props = { ...defaultProps, ...args };
    //Use mount so the child component is rendered
    return mount(<ManageProductPage {...props} />);
  }
  
  it("sets error when attempting to save an empty title field", () => {
    const wrapper = render({});
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Product Name is required.");
  });
  