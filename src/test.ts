import BloomFilter from './bloomFilter'

const bloomFilter = new BloomFilter();

(async () => {

    await bloomFilter.add("john");
    await bloomFilter.add('doe');
    
    console.log(await bloomFilter.contains("jayant"))
    console.log(await bloomFilter.contains("john"))
    console.log(await bloomFilter.contains("jane"))

})()