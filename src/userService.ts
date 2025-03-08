import { UserRepository, User } from './userRepository';
import BloomFilter from './bloomFilter';

export class UserService {
  private userRepository = new UserRepository();
  private bloomFilter = new BloomFilter();

  async createUser(user: User): Promise<void> {

    // Check if user already exists in bloom filter
    const isExists = await this.bloomFilter.contains(user.name);
    if(isExists) throw new Error("User already exists");

    // Since bloom filter is probabilistic, we need to check in database as well
    const exists = await this.userRepository.userExists(user.name);
    if (exists) {
        throw new Error('User already exists');
    }
    
    await this.bloomFilter.add(user.name);
    await this.userRepository.createUser(user);
  }

  async getUserByName(name: string): Promise<User | null> {
    return this.userRepository.getUserByName(name);
  }

  async userExists(name: string): Promise<boolean> {
    const isExists = await this.bloomFilter.contains(name);
    if(isExists == false) {
        return false;
    }
    return await this.userRepository.userExists(name);
  }
}
