import React from "react";
import NavMenu from "./NavMenu";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// Note how with shallow render you search for the React component tag
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<NavMenu />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

// Note how with mount you search for the final rendered HTML since it generates the final DOM.
// We also need to pull in React Router's memoryRouter for testing since the NavMenu expects to have React Router's props passed in.
it("contains 4 anchors via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <NavMenu />
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchors).toEqual(4);
});
