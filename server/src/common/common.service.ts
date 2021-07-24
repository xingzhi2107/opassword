import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { QuerySimpleListIdsDto } from './common.dto';
import { SimpleListIdsRO } from './common.interface';
import { classToPlain } from 'class-transformer';
import { ArrUtils } from '../utils/ArrUtils';
import { ObjUtils } from '../utils/ObjUtils';

export const ServiceUtils = {
  async getSimpleListIds(
    qb: SelectQueryBuilder<any>,
    dto: QuerySimpleListIdsDto,
    opt?: {
      withDeleted?: boolean;
    },
  ): Promise<SimpleListIdsRO> {
    qb.select(['id'])
      .orderBy(dto.orderBy.col, dto.orderBy.order)
      .limit(dto.perPage)
      .offset((dto.page - 1) * dto.perPage);
    if (opt?.withDeleted) {
      qb.withDeleted();
    }
    const rows = await qb.getRawMany();
    const ids = rows.map((x) => x.id);
    return {
      ids,
    };
  },

  async fetchEntitiesByIds<Entity>(
    qb: SelectQueryBuilder<Entity>,
    ids: number[],
    opt?: {
      withDeleted?: boolean;
    },
  ): Promise<Entity[]> {
    qb.whereInIds(ids);
    if (opt?.withDeleted) {
      qb.withDeleted();
    }
    return await qb.getMany();
  },

  packageSimpleListPlainDataItems<PlainData>(
    entities: any[],
    cols: string[],
  ): Partial<PlainData>[] {
    const mustHaveCols = ['id', 'createdAt', 'updatedAt', 'removedAt'];
    cols = ArrUtils.uniq([...cols, ...mustHaveCols]);
    return entities.map((x) => {
      const item = classToPlain(x) as PlainData;
      return ObjUtils.pickAll(cols, item) as PlainData;
    });
  },
};
