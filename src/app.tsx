import React from "react";
import { Provider } from "react-redux";

import "taro-ui/dist/style/index.scss"; // 全局引入一次即可

import { FC } from "./defineds"
import { getStore } from "./store"


import "./app.scss";

const store = getStore();


console.log('state',store.getState())

const App:FC = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default App
