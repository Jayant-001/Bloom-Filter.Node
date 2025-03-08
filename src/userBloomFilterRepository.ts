import redis from './redis';

export interface User {
  name: string;
  email: string;
}

export class UserBloomFilterRepository {
  private static redisKey = 'username_bloom_filter';

  // Create or update a user in Redis
  async addUser(offset: string): Promise<void> {
    await redis.setbit(UserBloomFilterRepository.redisKey, offset, 1);
  }

  // Check if a user exists
  async isExists(offset: string): Promise<boolean> {
    const exists = await redis.getbit(UserBloomFilterRepository.redisKey, offset);
    return exists === 1;
  }
}
