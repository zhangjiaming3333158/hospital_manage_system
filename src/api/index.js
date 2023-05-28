import * as trademark from '@/api/product/trademark'
import * as spu from '@/api/product/spu'
import * as sku from '@/api/product/sku'
import * as attr from '@/api/product/attr'
//引入权限相关的接口文件
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission'

export default {
  trademark,
  spu,
  sku,
  attr,
  permission,
  role,
  user
}
