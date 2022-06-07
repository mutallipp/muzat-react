import { IProductItem } from "@/api/IHome/types";
import { IPropsBase } from "@/defineds";

/**
 * 商品卡片props
 */
export interface IProductCardProps extends IPropsBase{
  productItem:IProductItem,
}
