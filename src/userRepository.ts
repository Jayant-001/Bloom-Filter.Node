import redis from './redis';

export interface User {
  name: string;
  email: string;
}

export class UserRepository {
  private static redisKey = 'user';

  // Create or update a user in Redis
  async createUser(user: User): Promise<void> {
    await redis.hset(UserRepository.redisKey, user.name, JSON.stringify(user));
  }

  // Get a user by name
  async getUserByName(name: string): Promise<User | null> {
    const userData = await redis.hget(UserRepository.redisKey, name);
    if (!userData) return null;
    return JSON.parse(userData);
  }

  // Check if a user exists
  async userExists(name: string): Promise<boolean> {
    const exists = await redis.hexists(UserRepository.redisKey, name);
    return exists === 1;
  }
}
