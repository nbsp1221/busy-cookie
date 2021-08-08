import axios from 'axios';
import type { HttpClientResponse } from '../../types';

export async function get<ResponseData>(url: string): Promise<HttpClientResponse<ResponseData>> {
  const response = await axios.get<ResponseData>(url);

  return {
    data: response.data,
    statusCode: response.status,
  };
}
