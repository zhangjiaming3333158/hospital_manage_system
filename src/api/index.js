//引入权限相关的接口文件
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission'
import * as department from './hospital/department'
import * as clinic from './hospital/clinic'
import * as consult from './hospital/consult'
import * as doctor from './hospital/doctor'

export default {
  permission,
  role,
  user,
  department,
  clinic,
  consult,
  doctor
}
