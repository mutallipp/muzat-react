import React, { useEffect } from "react";
import { Provider } from "react-redux";
import user from '@api/IUser'

import "taro-ui/dist/style/index.scss"; // 全局引入一次即可
import userActions, { UserActionType } from "@store/modules/user/actions";

import { FC } from "./defineds"
import { getStore } from "./store"


import "./app.scss";

const store = getStore();


console.log('state',store.getState())

const App:FC = ({ children }) => {
  const init = async () =>{
    store.dispatch(userActions.LOGIN())
  }

  useEffect(()=>{
    init()
  },[])
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default App
