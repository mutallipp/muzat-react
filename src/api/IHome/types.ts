/**
 * 基础类型
 */
interface IProductBase {
  id:number,
  createTime:string,
  lastEditTime:string,
}
/**
 * 首页轮播图项
 */
export interface ISwiperImgItem extends IProductBase{
  swiperKey:string,
  imgUrl:string,
  imgLink?:string,
  title?:string,
  content?:string,
}
/**
 * 类目项类型
 */
export interface ICategoryItem extends IProductBase{
  parentId:number,
  name:string,
  sort:number,
  color?:string,
  icon?:string,
  children?:Array<ICategoryItem>
}
/**
 * 商品照片类型
 */
export interface IProductImgItem extends IProductBase {
  imgUrl:string,
  productId:number,
}
/**
 * 商品标签类型
 */
export interface IProductTagItem extends IProductBase {
  categoryId:number,
  bgColor:string,
  name:string,
}
/**
 * 用户信息
 */
export interface IMemberInfo extends IProductBase{
  avatar:string,
  nickname:string,
}
/**
 * 商品项类型
 */
export interface IProductItem extends IProductBase{
  category:ICategoryItem,
  productCategoryId:number,
  commentCount:number,
  deleteStatus:number,
  memberId:number,
  newStatus:number,
  publishStatus:number,
  recommandStatus:number,
  sort:number,
  verifyStatus:number,
  visitCount:number,
  contactName?:string,
  contactPhone:string,
  description?:string,
  productImgs?:Array<IProductImgItem>,
  productTags?:Array<IProductTagItem>,
  memberInfo?:IMemberInfo,
}
/**
 * 首页返回数据类型
 */
export interface IHomePageResult {
  swiperImgList:Array<ISwiperImgItem>,
  categoriesList:Array<ICategoryItem>,
  productList:Array<IProductItem>,
}
