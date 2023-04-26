export class LRUCache<K, V> {
    private cache: Map<K, V>;
    private capacity: number;
  
    constructor(capacity: number) {
      this.cache = new Map(); // Initialize the cache using a Map object
      this.capacity = capacity; // Set the cache capacity
    }
  
    get(key: K): V | undefined {
      const value = this.cache.get(key); // Retrieve the value associated with the key
      if (value === undefined) {
        return undefined; // If the key is not in the cache, return undefined
      }
      this.cache.delete(key); // Remove the key-value pair from the cache
      this.cache.set(key, value); // Add the key-value pair back to the cache, updating its access order
      return value; // Return the retrieved value
    }
  
    put(key: K, value: V): void {
      if (this.cache.has(key)) {
        this.cache.delete(key); // If the key already exists, remove it to update its access order later
      } else if (this.cache.size >= this.capacity) {
        const lruKey = this.cache.keys().next().value; // If the cache is full, find the least recently used key (first key in the Map)
        this.cache.delete(lruKey); // Remove the least recently used key-value pair from the cache
      }
      this.cache.set(key, value); // Add the new key-value pair to the cache
    }
  }
  