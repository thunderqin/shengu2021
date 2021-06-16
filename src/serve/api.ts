import { get, post } from "../utils/requireHttp";

export const LoginApi = '/api/login';
export const addUserApi = '/api/user/add';
export const edituserApi = '/api/user/edit';
export const listApi = '/api/user/list';
export const adminListApi = '/api/user/admin/list';
export const resetPassWordApi = '/api/user/admin/reset/password';


// 登陆
export const login = (params: {account: string,password: string}) => {
  return post(LoginApi, params)
}

interface IAdduser {
  account: string,
  user_name: string,
  user_role: string,
  password?: string,
  admin_id?: string,
}
// 添加用户
export const addUser = (params: IAdduser) => {
  return post(addUserApi, params)
}

// 编辑用户
interface IEditUser extends IAdduser {
  id: string,
  account: string,
  user_name: string,
  password?: string,
  repassword?: string,
  admin_id?: string,
}

export const editUser = (params:IEditUser) => {
  return post(edituserApi, params)
}

// 查询用户
interface IQueryUsers{
  account?: string;
  user_role?: string;
  user_name?: string;
}
export const queryUsers = (params:IQueryUsers) => {
  return get(listApi, params)
}

//
export const queryAdminList = () => {
  return get(adminListApi)
}

export const resetPassWord = (params: {password: string,repassword: string })=>{
  return post(resetPassWordApi, params)
}


