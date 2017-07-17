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
