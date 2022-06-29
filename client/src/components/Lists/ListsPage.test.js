import React from "react";
// import { configure, shallow, mount, render } from "enzyme";
import { render, screen, fireEvent } from "@testing-library/react";
// import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// configure({ adapter: new Adapter() });
import store from "../../reducers/store.js";
import ListsPage from "./ListsPage";
//
// describe.only("ListsPage", () => {
//   it("works", () => {
//     expect(2+2).toEqual(4);
//   });
// });

test("fetches list store in useEffect (ListsPage)", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ListsPage />
      </BrowserRouter>
    </Provider>
  );

  console.log(store);
});
