import axios from "axios"

export class AxiosAdapter {
  async request<returnType>(requestOptions: AxiosAdapter.RequestOptions): Promise<returnType> {
    const { url, method } = requestOptions
    return (await axios.request({ method, url })).data
  }
}

export namespace AxiosAdapter {
  export type RequestOptions = {
    method: Method
    url: string
  }
  export enum Method {
    get = 'get'
  }
}