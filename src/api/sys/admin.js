// import requset from './request'
import { adminHttp } from '/@/utils/http/axios';

export function findAllResume(params){
  return adminHttp.get(
    {
      url: '/base/resume/getAll',
      params,
    }
  )
}
export function login(data){
  return adminHttp.post(
    {
      url: '/base/user/login',
      data,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export function findAllRegister(){
  return adminHttp.get(
    {
      url: '/base/resume/getAll',
    }
  )
}
export function findAllActivated(){
  return adminHttp.get(
    {
      url: '/base/resume/getAll',
    }
  )
}

export function activateUser(data){
  return adminHttp.post(
    {
      url: '/base/user/active',
      data
    }
  )
}
export function findactivateUser(params){
  return adminHttp.get(
    {
      url: '/base/user/noActive',
      params
    }
  )
}
export function deleteUser(data){
  return adminHttp.post(
    {
      url: '/base/user/deleteUser',
      data
    }
  )
}
export function findUser(params){
  return adminHttp.get(
    {
      url: '/base/user/isActive',
      params
    }
  )
}
export function findAllCompanyAPI(){
  return adminHttp.get(
    {
      url: '/base/user/getCompany'
    }
  )
}
export function findCompanyUserAPI(params){
  return adminHttp.get(
    {
      url: '/base/user/companyToUser',
      params
    }
  )
}

// 查询登录记录表
export function findAllLoginHistoryAPI(params){
  return adminHttp.get(
    {
      url: '/base/loginhistory/getLoginLog',
      params
    }
  )
}
// 按公司查询登录记录表
export function findCompanyLoginHistoryAPI(params){
  return adminHttp.get(
    {
      url: '/base/loginhistory/getCompanyLogin',
      params
    }
  )
}
// 查询api调用记录表
export function findAllApipostAPI(params){
  return adminHttp.get(
    {
      url: '/base/api/getApiLog',
      params
    }
  )
}
// 按公司查询api调用记录表
export function findCompanyApipostAPI(params){
  return adminHttp.get(
    {
      url: '/base/api/getCompanyApi',
      params
    }
  )
}
