import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',   // Redis server host (use your server info)
  port: 6379,          // Redis server port
  db: 0                // Redis database index (optional)
});

export default redis;