import devConfig from './dev.config'
import prodConfig from './prod.config'


// console.log('process',dev);
// 环境配置
const configure = {}
const { NODE_ENV = '' } = process.env
if(NODE_ENV === 'production'){
  Object.assign(configure,prodConfig)
}else{
  Object.assign(configure,devConfig)
}
// export default configure
export default configure

