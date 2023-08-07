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

