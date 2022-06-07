import { ICategoryItem } from "@/api/IHome/types";
import { IPropsBase } from "@/defineds";
import { CSSProperties } from "react";

/**
 * 类目props类型
 */
export interface ICategoryProps extends IPropsBase{
  categoryList:Array<ICategoryItem>,
  style?:CSSProperties
}
