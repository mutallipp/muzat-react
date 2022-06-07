import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useDidHide, useDidShow,onPageNotFound } from "@tarojs/taro";
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

   // 可以使用所有的 React Hooks
  useEffect(()=>{
    init()
    console.log('app onLoad')

  },[])
  // 对应 onShow
  useDidShow(() => {
    console.log('app onShow')
  })

  // 对应 onHide
  useDidHide(() => {
    console.log('app onHide')
  })
  onPageNotFound((option)=>{
    console.log('onPageNotFound');

  })
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default App
