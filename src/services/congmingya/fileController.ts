// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** removeFile DELETE /api/oss/file/remove */
export async function removeFileUsingDELETE(body: string, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject_>('/api/oss/file/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** upload POST /api/oss/file/upload */
export async function uploadUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadUsingPOSTParams,
  body: string,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseString_>('/api/oss/file/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
