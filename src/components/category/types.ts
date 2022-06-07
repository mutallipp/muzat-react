import { ICategoryItem } from "@/api/IHome/types";
import { IPropsBase } from "@/defineds";

/**
 * 类目props类型
 */
export interface ICategoryProps extends IPropsBase{
  categoryList:Array<ICategoryItem>
}
