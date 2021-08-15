import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { defaultHeaders } from '../constants';
import type { HttpClientConfig, HttpClientResponse } from '../types';

export class HttpClient {
  private config: HttpClientConfig;

  constructor(config?: HttpClientConfig) {
    this.config = {
      ...config,
      headers: {
        ...defaultHeaders,
        ...config?.headers,
      },
    };
  }

  public async get<ResData>(url: string, config?: HttpClientConfig): Promise<HttpClientResponse<ResData>> {
    const response = await axios.get<ResData>(url, {
      ...this.convertToAxiosConfig(this.config),
      ...this.convertToAxiosConfig(config),
    });

    return {
      statusCode: response.status,
      data: response.data,
    };
  }

  public async post<ReqData, ResData>(url: string, data?: ReqData, config?: HttpClientConfig): Promise<HttpClientResponse<ResData>> {
    const response = await axios.post<ResData>(url, data, {
      ...this.convertToAxiosConfig(this.config),
      ...this.convertToAxiosConfig(config),
    });

    return {
      statusCode: response.status,
      data: response.data,
    };
  }

  private convertToAxiosConfig(config?: HttpClientConfig): AxiosRequestConfig | undefined {
    if (!config) {
      return undefined;
    }

    return {
      baseURL: config.baseUrl,
      headers: {
        ...(config.headers?.contentType && { 'Content-Type': config.headers.contentType }),
        ...(config.headers?.cookie && { 'Cookie': config.headers.cookie }),
        ...(config.headers?.userAgent && { 'User-Agent': config.headers.userAgent }),
      },
    };
  }
}
