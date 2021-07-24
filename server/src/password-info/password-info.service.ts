import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PasswordInfoEntity } from './password-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePasswordInfoDto,
  PatchUpdatePasswordInfoDto,
} from './password-info.dto';
import {
  PasswordInfoPlainData,
  PasswordInfoRO,
} from './password-info.interface';
import { validate } from 'class-validator';
import { classToPlain } from 'class-transformer';
import { SimpleListIdsRO, SimpleListItemRO } from '../common/common.interface';
import {
  FetchSimpleListEntitiesDto,
  QuerySimpleListIdsDto,
} from '../common/common.dto';
import { ServiceUtils } from '../common/common.service';
import { strict as assert } from 'assert';

@Injectable()
export class PasswordInfoService {
  constructor(
    @InjectRepository(PasswordInfoEntity)
    private readonly passwordInfoRepository: Repository<PasswordInfoEntity>,
  ) {}

  public async createPasswordInfo(
    userId: number,
    dto: CreatePasswordInfoDto,
  ): Promise<PasswordInfoRO> {
    const passwordInfo = this.passwordInfoRepository.create({
      ...dto,
      userId,
    });
    const errors = await validate(passwordInfo);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    } else {
      const savedPasswordInfo = await this.passwordInfoRepository.save(
        passwordInfo,
      );
      return PasswordInfoService.buildRO(savedPasswordInfo);
    }
  }

  public async fetchSimpleListIds(
    userId: number,
    queryDto: QuerySimpleListIdsDto,
  ): Promise<SimpleListIdsRO> {
    const qb = this.passwordInfoRepository.createQueryBuilder(
      'password-info-simple-list-ids',
    );
    qb.where('userId = :userId', { userId });
    return ServiceUtils.getSimpleListIds(qb, queryDto);
  }

  public async fetchSimpleListData(
    userId: number,
    { ids, cols }: FetchSimpleListEntitiesDto,
  ): Promise<SimpleListItemRO<PasswordInfoPlainData>> {
    const qb = this.passwordInfoRepository.createQueryBuilder(
      'password-info-simple-list-data',
    );
    qb.where('userId = :userId', { userId });
    const entities = await ServiceUtils.fetchEntitiesByIds(qb, ids);
    const items =
      ServiceUtils.packageSimpleListPlainDataItems<PasswordInfoPlainData>(
        entities,
        cols,
      );

    return {
      items,
    };
  }

  public async patchUpdatePasswordInfo(
    userId: number,
    id: number,
    dto: PatchUpdatePasswordInfoDto,
  ): Promise<PasswordInfoRO> {
    const where = {
      id,
      userId,
    };

    const result = await this.passwordInfoRepository.update(where, {
      ...dto,
    });
    assert.equal(result.affected, 1);

    const passwordInfo = await this.fetchPasswordInfoById(userId, id);

    return PasswordInfoService.buildRO(passwordInfo);
  }

  public async softRemovePasswordInfo(
    userId: number,
    id: number,
  ): Promise<PasswordInfoRO> {
    const passwordInfo = await this.fetchPasswordInfoById(userId, id);
    // TODO: softRemove虽然成功了，但是返回的entity还是旧的值，updatedAt依然是Null
    //       导致我现在不得不再query一次。
    //       另外，remove希望有userId参与，所以提供的softDelete没办法用，只能使用
    //       softRemove，但是这玩意只认entity，我不得不提前又query一次，真是愚蠢。
    await this.passwordInfoRepository.softRemove(passwordInfo);
    const removedPasswordInfo = await this.fetchPasswordInfoById(userId, id, {
      withDeleted: true,
    });
    return PasswordInfoService.buildRO(removedPasswordInfo);
  }

  private async fetchPasswordInfoById(
    userId: number,
    id: number,
    opt?: {
      withDeleted?: boolean;
    },
  ): Promise<PasswordInfoEntity> {
    const qb = this.passwordInfoRepository.createQueryBuilder(
      'fetch-password-info-by-id',
    );
    qb.where('1 = 1');
    qb.andWhere('id = :id', { id }).andWhere('userId = :userId', { userId });
    if (opt?.withDeleted) {
      qb.withDeleted();
    }

    return await qb.getOne();
  }

  private static buildRO(entity: PasswordInfoEntity): PasswordInfoRO {
    const data = classToPlain(entity) as PasswordInfoPlainData;
    return {
      passwordInfo: data,
    };
  }
}
