import request from '@/util/request';

export interface ListResult<T> {
    count: number;
    result: T[];
}

export abstract class BaseService<T> {
    protected request = request;
    protected abstract baseUrl: string;

    protected _list(page: number = 1, params: any = {}, url: string = this.baseUrl): Promise<ListResult<T>> {
        return this.get(url, { page, ...params });
    }

    protected _detail(id: any, url: string = this.baseUrl): Promise<T> {
        url = `${url}/${id}`;
        return this.get(url);
    }

    protected _create(data: any, url: string = this.baseUrl): Promise<T> {
        return this.post(url, data);
    }

    protected _update(id: any, data: any, url: string = this.baseUrl): Promise<T> {
        url = `${url}/${id}`;
        return this.post(url, data);
    }

    protected get(url: string, params?: any): Promise<any> {
        return request({
            method: 'get',
            url,
            params
        });
    }

    protected post(url: string, data?: any, params?: any): Promise<any> {
        return request({
            method: 'post',
            url,
            data,
            params
        });
    }

    protected put(url: string, data?: any, params?: any): Promise<any> {
        return request({
            method: 'put',
            url,
            data,
            params
        });
    }

}
