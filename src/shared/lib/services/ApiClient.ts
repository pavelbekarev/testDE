interface IOptions {
  method: string;
  headers: any;
  body?: any;
}

/**
 *  Класс для работы с HTTP-запросами
 */
export class ApiClient {
  static instance: any;

  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse(response) {
    const contentType = response.headers.get("Content-Type");
    console.debug(contentType);

    let responseData;
    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else if (
      contentType.includes("text/plain") ||
      contentType.includes("text/html")
    ) {
      responseData = await response.text();
    } else if (
      contentType.includes("application/xml") ||
      contentType.includes("text/xml")
    ) {
      responseData = await response.text();
    } else if (
      contentType.includes("image/") ||
      contentType.includes("application/octet-stream")
    ) {
      responseData = await response.blob();
    } else {
      responseData = await response.text();
    }

    return responseData;
  }

  public async request(
    endpoint,
    method = "POST",
    body = null,
    headers = {},
    contentType = "application/json"
  ) {
    const url = `${this.baseUrl}/${endpoint}`;
    const options: IOptions = {
      method,
      headers: {
        "Content-Type": contentType,
        ...headers,
      },
    };

    if (body) {
      switch (contentType) {
        case "application/json":
          options.body = JSON.stringify(body);
          break;
        default:
          options.body = body;
      }
    }

    try {
      const response = await fetch(url, options);

      return this.handleResponse(response);
    } catch (e) {
      console.error(e);
    }
  }

  private serializeParams(params) {
    return new URLSearchParams(params).toString();
  }

  public get(endpoint, params = {}, headers = {}) {
    const queryString = this.serializeParams(params);
    const urlWithParams = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(urlWithParams, "GET", null, headers);
  }

  public post(endpoint, body, headers = {}, contentType = "application/json") {
    return this.request(endpoint, "POST", body, headers, contentType);
  }
}
