import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Burger } from './burger.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AddBurgerDto } from './dto/add-burger.dto';
import { User } from '../auth/user.entity';
import { EditBurgerDto } from './dto/edit-burger.dto';

@Injectable()
export class BurgerService {
  constructor(
    @InjectRepository(Burger)
    private burgerRepository: Repository<Burger>,
    private jwtService: JwtService,
  ) {}

  async getAllBurger() {
    return await this.burgerRepository.find();
  }

  async getAllBurgerWithUserId(userId: number) {
    const query = this.burgerRepository.createQueryBuilder('burger');

    query.where('burger.userId = :userId', { userId });

    return await query.getMany();
  }

  async getBurger(burgerId) {
    return await this.burgerRepository.findOne({
      where: {
        id: burgerId,
      },
    });
  }

  async addBurger(addBurgerDto: AddBurgerDto, user: User) {
    const burger = this.burgerRepository.create({
      name: addBurgerDto.name,
      brand: addBurgerDto.brand,
      description: addBurgerDto.description,
      user: user,
    });

    return this.burgerRepository.save(burger);
  }

  async editBurger(
    editBurgerId: number,
    user: User,
    editBurgerDto: EditBurgerDto,
  ) {
    const targetBurger = await this.burgerRepository.findOne({
      where: {
        id: editBurgerId,
        user,
      },
    });

    targetBurger.name = editBurgerDto.name;
    targetBurger.brand = editBurgerDto.brand;
    targetBurger.description = editBurgerDto.description;

    return this.burgerRepository.save(targetBurger);
  }

  async deleteBurger(deleteBurgerId: number, user: User) {
    const result = await this.burgerRepository.delete({
      id: deleteBurgerId,
      user,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Can't find Burger with id ${deleteBurgerId}`,
      );
    }
  }
}
