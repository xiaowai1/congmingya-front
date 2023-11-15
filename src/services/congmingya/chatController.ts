// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getAnswer POST /api/chat/get/answer */
export async function getAnswerUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAnswerUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAiResponseMessage_>('/api/chat/get/answer', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listLoginUserChat POST /api/chat/list */
export async function listLoginUserChatUsingPOST(
  body: API.ChatQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChat_>('/api/chat/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
