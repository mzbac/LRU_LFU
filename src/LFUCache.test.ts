import { LFUCache } from './LFUCache';

describe('LFUCache', () => {
  test('basic LFU cache operations', () => {
    const cache = new LFUCache<string, number>(3);

    cache.put('one', 1);
    cache.put('two', 2);
    cache.put('three', 3);

    expect(cache.get('one')).toBe(1);
    expect(cache.get('two')).toBe(2);

    cache.put('four', 4);

    expect(cache.get('three')).toBeUndefined();

    expect(cache.get('one')).toBe(1);
    expect(cache.get('two')).toBe(2);
    expect(cache.get('four')).toBe(4);
  });
});
