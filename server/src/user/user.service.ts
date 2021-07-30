import * as crypto from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { classToPlain } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import { strict as assert } from 'assert';

import { UserEntity } from './user.entity';
import {
  LoginByPasswordDto,
  SignUpByEmailDto,
  PatchUpdateProfileDto,
} from './user.dto';
import { UserData, UserRO } from './user.interface';
import { OPException } from '../common/common.error';
import { UserErrorCodes } from './user.error';
import * as config from '../config';
import { StringUtils } from '../utils/StringUtils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async signUpByEmail(dto: SignUpByEmailDto): Promise<UserRO> {
    const existUser = await this.fetchUserByEmail(dto.email);
    if (existUser) {
      throw new OPException(UserErrorCodes.EmailHaveBeenUsed);
    }

    const user = this.userRepository.create({
      ...dto,
    });

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    } else {
      user.password = await this.hashPassword(user.password);
      const savedUser = await this.userRepository.save(user);
      const ro = UserService.buildUserRO(savedUser);
      ro.token = UserService.genLoginToken(savedUser);
      return ro;
    }
  }

  public async loginByEmail(dto: LoginByPasswordDto): Promise<UserRO> {
    const passwordHash = await this.hashPassword(dto.password);
    const user = await this.fetchUserByEmail(dto.email);
    if (!user) {
      throw new OPException(UserErrorCodes.AccountIsNotExist);
    }
    if (StringUtils.safeEqual(passwordHash, user.password)) {
      const ro = UserService.buildUserRO(user);
      ro.token = UserService.genLoginToken(user);
      return ro;
    } else {
      throw new OPException(UserErrorCodes.PasswordIsInvalid);
    }
  }

  public async updateProfile(
    userId: number,
    dto: PatchUpdateProfileDto,
  ): Promise<UserRO> {
    const where = {
      id: userId,
    };
    const result = await this.userRepository.update(where, {
      ...dto,
    });
    assert.equal(result.affected, 1);

    const user = await this.fetchUserEntityById(userId);
    return UserService.buildUserRO(user);
  }

  public async fetchUserById(id: number): Promise<UserRO | null> {
    const user = await this.fetchUserEntityById(id);
    if (user) {
      return UserService.buildUserRO(user);
    } else {
      return null;
    }
  }

  private async fetchUserEntityById(id: number): Promise<UserEntity | null> {
    const users = await this.userRepository.findByIds([id]);

    return users[0] || null;
  }

  private async fetchUserByEmail(email: string): Promise<UserEntity | null> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    return (await qb.getOne()) || null;
  }

  private static genLoginToken(user: UserEntity): string {
    const { id } = user;

    const payload = {
      id,
    };
    return jwt.sign(payload, config.SECRET, { expiresIn: '60d' });
  }

  private static buildUserRO(user: UserEntity): UserRO {
    const userData = classToPlain(user) as UserData;
    delete (userData as any).password;
    return {
      user: userData,
    };
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.scrypt(password, config.PASSWORD_SALT, 64, (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        resolve(derivedKey.toString('hex'));
      });
    });
  }
}
