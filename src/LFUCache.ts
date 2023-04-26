export class LFUCache<K, V> {
    private cache: Map<K, V>;
    private frequencies: Map<K, number>;
    private capacity: number;
  
    constructor(capacity: number) {
      this.cache = new Map(); // Initialize the cache using a Map object
      this.frequencies = new Map(); // Initialize the frequencies using a Map object
      this.capacity = capacity; // Set the cache capacity
    }
  
    get(key: K): V | undefined {
      const value = this.cache.get(key); // Retrieve the value associated with the key
      if (value === undefined) {
        return undefined; // If the key is not in the cache, return undefined
      }
      this.frequencies.set(key, this.frequencies.get(key)! + 1); // Increment the access count for the key
      return value; // Return the retrieved value
    }
  
    put(key: K, value: V): void {
      if (this.cache.has(key)) {
        this.cache.set(key, value); // If the key already exists, update its value
        this.frequencies.set(key, this.frequencies.get(key)! + 1); // Increment the access count for the key
      } else {
        if (this.cache.size >= this.capacity) {
          let lfuKey: K | undefined;
          let minFrequency = Infinity;
  
          // Iterate through all key-frequency pairs to find the least frequently used key
          for (const [k, f] of this.frequencies.entries()) {
            if (f < minFrequency) {
              lfuKey = k;
              minFrequency = f;
            }
          }
  
          if (lfuKey !== undefined) {
            this.cache.delete(lfuKey); // Remove the least frequently used key-value pair from the cache
            this.frequencies.delete(lfuKey); // Remove the key-frequency pair from the frequencies Map
          }
        }
  
        this.cache.set(key, value); // Add the new key-value pair to the cache
        this.frequencies.set(key, 1); // Initialize the access count for the new key to 1
    }
  }
}  