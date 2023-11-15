// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addAssistant POST /api/assistant/add */
export async function addAssistantUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/assistant/add', {
    method: 'POST',
    ...(options || {}),
  });
}

/** getLatestAssistant GET /api/assistant/get/latest */
export async function getLatestAssistantUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/assistant/get/latest', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listMyAssistant POST /api/assistant/list/page */
export async function listMyAssistantUsingPOST(
  body: API.ChatAssistantQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChatAssistant_>('/api/assistant/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
