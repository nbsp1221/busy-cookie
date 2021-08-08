import axios from 'axios';
import type { HttpClientResponse } from '../../types';

export async function post<RequestData, ResponseData>(url: string, data?: RequestData): Promise<HttpClientResponse<ResponseData>> {
  const response = await axios.post<ResponseData>(url, data);

  return {
    data: response.data,
    statusCode: response.status,
  };
}
