export interface Headers {
  contentType?: string;
  cookie?: string;
  userAgent?: string;
}

export interface HttpClientConfig {
  baseUrl?: string;
  headers?: Headers;
}

export interface HttpClientResponse<Data> {
  data: Data;
  statusCode: number;
}
