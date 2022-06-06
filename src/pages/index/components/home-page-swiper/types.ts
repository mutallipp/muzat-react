import { ISwiperImgItem } from "@api/IHome/types";
import { IPropsBase } from "@defineds/index";

export interface IHomePageSwiperProps extends IPropsBase {
  swiperImgList:Array<ISwiperImgItem>
}
