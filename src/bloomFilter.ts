import crypto from 'crypto';
import { UserBloomFilterRepository } from './userBloomFilterRepository';

class BloomFilter {

    repository: UserBloomFilterRepository;
    size: number;
    hashCount: number;

    constructor(expectedItems: number = 1000000, errorRate: number = 0.01) {
        this.repository = new UserBloomFilterRepository();
        this.size = this.calculateSize(expectedItems, errorRate);;
        this.hashCount = this.calculateHashCount(this.size, expectedItems);
    }

    // Optimal size calculation (m)
    calculateSize(n: number, p: number) {
        return Math.ceil(-(n * Math.log(p)) / (Math.log(2) ** 2));
    }

    // Optimal hash functions count (k)
    calculateHashCount(m: number, n: number) {
        return Math.ceil((m / n) * Math.log(2));
    }

    // generate hash value for given value and seed
    hash(value: string, seed: string) {
        const hash = crypto.createHash('md5').update(value + seed).digest('hex');
        return parseInt(hash, 16) % this.size;
    }

    // add value to bloom filter
    async add(value: string) {
        for (let i = 0; i < this.hashCount; i++) {
            const index = this.hash(value, i.toString());
            await this.repository.addUser(index.toString());
        }
    }

    // check if value exists in bloom filter
    async contains(value: string) {
        for (let i = 0; i < this.hashCount; i++) {
            const index = this.hash(value, i.toString());
            const isExists = await this.repository.isExists(index.toString());
            if (isExists) {
                return true;
            }
        }
        return false;
    }
}

export default BloomFilter;