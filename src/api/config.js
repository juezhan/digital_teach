/**
 * 描述：配置文件
 * 开发人：桑杨
 * 开发日期：2017年7月14日
 */

//  缓存校验时间
export const CacheTime = 7200000
export const RequestAdmin = 'http://localhost:8181'
export const RequestApplication = '/camel/rest/system/applications'
export const RequestApi = {
  SystemApplication: RequestAdmin + RequestApplication,
  SystemApplications: {
    admin: RequestAdmin + RequestApplication + '/admin',
    common: RequestAdmin + RequestApplication + '/common',
    oa: RequestAdmin + RequestApplication + '/oa',
    schedule: RequestAdmin + RequestApplication + '/schedule'
  }
}

//  用户列表
export const UserListUrl = RequestAdmin + '/camel/rest/users'

//  用户列表
export const RoleListUrl = RequestAdmin + '/camel/rest/users'

//  字典列表
export const ScheduleDicts = RequestAdmin + '/camel/rest/schedule/dicts'

//  分页配置
export const PageConfig = {
  sizes: [20, 30, 40],
  limit: 20,
  page: 1,
  start: 0
}

//  字典类型列表
export const ScheduleDictsTypesList = RequestAdmin + '/camel/rest/schedule/dicts/types/list'
