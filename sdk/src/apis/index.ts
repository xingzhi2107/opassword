import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserRO } from './server-types/user/user.interface';
import {
  LoginByPasswordDto,
  PatchUpdateProfileDto,
  SignUpByEmailDto,
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
  private httpClient: AxiosInstance;

  constructor(
    private baseUrl: string,
    private authToken: string | null = null,
    private autoSetAuthToken = true,
  ) {
    this.httpClient = this.setupHttpClient(baseUrl, authToken);
  }

  public setupAuthToken(authToken: string) {
    this.authToken = authToken;
    this.httpClient = this.setupHttpClient(this.baseUrl, this.authToken);
  }

  public async signUp(dto: SignUpByEmailDto) {
    const res = await this.req<UserRO>({
      method: 'post',
      url: '/user//sign-up-by-email',
      data: dto,
    });
    if (res.errcode === 0 && this.autoSetAuthToken) {
      this.setupAuthToken(res.data.token);
    }
    return res;
  }

  public async login(dto: LoginByPasswordDto) {
    const res = await this.req<UserRO>({
      method: 'post',
      url: '/user/login-by-email',
      data: dto,
    });
    if (res.errcode === 0 && this.autoSetAuthToken) {
      this.setupAuthToken(res.data.token);
    }
    return res;
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
    baseURL: string,
    authToken: string | null = null,
  ): AxiosInstance {
    const headers: any = {
      'Content-Type': 'application/json',
    };
    if (authToken) {
      headers.Authorization = 'Bearer ' + authToken;
    }

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
