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
export function findactivateUser(){
  return adminHttp.get(
    {
      url: '/base/user/noActive',
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
export function findUser(){
  return adminHttp.get(
    {
      url: '/base/user/isActive'
    }
  )
}


