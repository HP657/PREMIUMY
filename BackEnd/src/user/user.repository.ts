// user.repository.ts
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository extends Repository<User> {
  async findBySocialIdAndProvider(socialId: string, provider: string): Promise<User | null> {
    return this.findOne({ where: { socialId, provider } });
  }
}
