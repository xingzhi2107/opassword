export interface FetchSimpleListEntitiesDto {
  ids: number[];
  cols: string[];
}

export interface QuerySimpleListIdsDto {
  page: number;
  perPage: number;
  orderBy: {
    col: string;
    order: 'ASC' | 'DESC';
  };
}
