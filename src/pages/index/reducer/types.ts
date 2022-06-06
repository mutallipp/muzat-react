/**
 * 地址相关数据
 * */

import { ICategoryItem, IProductItem, ISwiperImgItem } from "@/api/IHome/types";

export default interface IHomePageState {
  test?: string,
  swiperImgList:Array<ISwiperImgItem>,
  categoriesList:Array<ICategoryItem>,
  productList:Array<IProductItem>,
}
