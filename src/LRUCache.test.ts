import { LRUCache } from './LRUCache';

describe('LRUCache', () => {
  test('basic LRU cache operations', () => {
    const cache = new LRUCache<string, number>(3);

    cache.put('one', 1);
    cache.put('two', 2);
    cache.put('three', 3);

    expect(cache.get('one')).toBe(1);

    cache.put('four', 4);

    expect(cache.get('two')).toBeUndefined();

    expect(cache.get('three')).toBe(3);
    expect(cache.get('four')).toBe(4);
  });
});
