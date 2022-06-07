---
imgUrl: 图片地址
alt: 图片描述(原生alt属性)
width: 宽度(设计稿的尺寸)
height: 高度(设计稿的尺寸)
display: 元素盒子类型属性(原生display属性)
onClick: 图片点击回调
onLoad: 图片加载完毕回调
link: 点击图片的跳转链接
isLazyload: 是否使用懒加载模式
defaultImage: 默认图片类型
desginWidth: 设计稿宽度
imageChildren: 图片内容注入,适应swiper内
useZip: 是否启用压缩图片
---

# 图片组件

## API

| 参数          | 说明                      | 类型                        | 默认值 | 备注                          |
| ------------- | ------------------------- | --------------------------- | ------ | ----------------------------- |
| imgUrl        | 图片地址                  | string                      | ''     | -                             |
| alt           | 图片描述                  | string                      | -      | -                             |
| width         | 宽度                      | number                      | -      | -                             |
| height        | 高度                      | number                      | -      | -                             |
| display       | 元素盒子类型属性          | string                      | -      | -                             |
| onClick       | 图片点击回调              | () => {}                    | -      | -                             |
| onLoad        | 图片加载完毕回调          | () => {}                    | -      | -                             |
| link          | 点击图片的跳转链接        | string                      | -      | 也可以通过onClick属性实现功能 |
| isLazyload    | 是否使用懒加载模式        | boolean                     | true   | -                             |
| defaultImage  | 默认图片类型              | 'mini' / 'small' / 'medium' | 'mini' | 默认图片的尺寸                |
| desginWidth   | 设计稿宽度                | number                      | 375    | -                             |
| imageChildren | 图片内容注入,适应swiper内 | () => {}                    | -      | -                             |
| useZip        | 是否启用压缩图片          | boolean                     | false  | -                             |
| isInterlace   | 是否开启图像渐进式加载 | boolean | false | - |
### 例

```tsx
import { Image } from '@components/index'

<Image imgUrl={Pic} width={375} height={375} />
```
