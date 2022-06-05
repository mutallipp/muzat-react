//默认配置
import { IAnyObj } from '@/defineds'
import configure from './default/index'

//导出配置（以自定义配置为主）

const config:IAnyObj = Object.assign({},configure)

export default config
