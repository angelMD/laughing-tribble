function flatten(arr) {
  const ret = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      ret.push.apply(ret, flatten(arr[i]));
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
}


describe('flatten', () => {
  const arr = [1, [2], [3, 4, [5]]];

  it('will return another array', () => {
    expect(flatten(arr)).not.toBe(arr);
  });

  it('will flatten an simple array', () => {
    expect(flatten([1, 2, 3, 4, [5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it('will flatten an array', () => {
    expect(flatten(arr)).toEqual([1, 2, 3, 4, 5]);
  });
});
