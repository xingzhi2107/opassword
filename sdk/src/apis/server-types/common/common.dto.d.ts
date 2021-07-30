export declare class FetchSimpleListEntitiesDto {
  ids: number[];
  cols: string[];
}
export declare class QuerySimpleListIdsDto {
  readonly page: number;
  readonly perPage: number;
  readonly orderBy: {
    col: string;
    order: 'ASC' | 'DESC';
  };
  constructor(query: any);
}
