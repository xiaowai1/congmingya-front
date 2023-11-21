// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deletePicture POST /api/picture/delete */
export async function deletePictureUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/picture/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** genPicture POST /api/picture/gen/picture */
export async function genPictureUsingPOST(
  body: API.PictureAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePictureResponse_>('/api/picture/gen/picture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getPictureById GET /api/picture/get */
export async function getPictureByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePicture_>('/api/picture/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMyPictureByPage POST /api/picture/my/list/page */
export async function listMyPictureByPageUsingPOST(
  body: API.PictureQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePicture_>('/api/picture/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
