import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserRO } from './server-types/user/user.interface';
import {
  LoginByPasswordDto,
  PatchUpdateProfileDto,
} from './server-types/user/user.dto';
import {
  CreatePasswordInfoDto,
  PatchUpdatePasswordInfoDto,
} from './server-types/password-info/password-info.dto';
import {
  PasswordInfoPlainData,
  PasswordInfoRO,
} from './server-types/password-info/password-info.interface';
import { FetchSimpleListEntitiesDto } from './server-types/common/common.dto';
import {
  SimpleListIdsRO,
  SimpleListItemRO,
} from './server-types/common/common.interface';

interface ApiResponse<T> {
  errcode: number;
  errmsg: string;
  data: T;
}

interface SimpleIdsQuery {
  'order-by'?: string;
  'per-page'?: number;
  page?: number;
}

export class OPasswordApis {
  private readonly httpClient: AxiosInstance;

  constructor(private host: string, private authToken: string | null = null) {
    this.httpClient = this.setupHttpClient(host, authToken);
  }

  public login(dto: LoginByPasswordDto) {
    return this.req<UserRO>({
      method: 'post',
      url: '/user/login-by-email',
      data: dto,
    });
  }

  public patchUpdateProfile(dto: PatchUpdateProfileDto) {
    return this.req<UserRO>({
      method: 'patch',
      url: '/user/profile',
      data: dto,
    });
  }

  public getUserInfo() {
    return this.req<UserRO>({
      method: 'get',
      url: '/user/curr-user',
    });
  }

  public createPasswordInfo(dto: CreatePasswordInfoDto) {
    return this.req<PasswordInfoRO>({
      method: 'post',
      url: '/password-info/',
      data: dto,
    });
  }

  public fetchPasswordInfoIds(query: SimpleIdsQuery = {}) {
    return this.req<SimpleListIdsRO>({
      method: 'get',
      url: '/password-info/ids',
      params: query,
    });
  }

  public fetchPasswordInfos(dto: FetchSimpleListEntitiesDto) {
    return this.req<SimpleListItemRO<PasswordInfoPlainData>>({
      method: 'post',
      url: '/password-info/fetch-entities',
      data: dto,
    });
  }

  public patchUpdatePasswordInfo(dto: PatchUpdatePasswordInfoDto) {
    return this.req<PasswordInfoRO>({
      method: 'patch',
      url: `/password-info/${dto.id}`,
      data: dto,
    });
  }

  public softDeletePasswordInfo(id: number) {
    return this.req<PasswordInfoRO>({
      method: 'delete',
      url: `/password-info/${id}`,
    });
  }

  private setupHttpClient(
    host: string,
    authToken: string | null = null,
  ): AxiosInstance {
    const headers: any = {
      'Content-Type': 'application/json',
    };
    if (authToken) {
      headers.Authorization = 'Bearer ' + authToken;
    }
    // const baseURL = host + '/api';
    const baseURL = host;

    return axios.create({
      baseURL,
      headers,
    });
  }

  private async req<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const res = (await this.httpClient(config)) as AxiosResponse<
      ApiResponse<T>
    >;
    return res.data;
  }
}
