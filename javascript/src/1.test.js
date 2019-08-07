function arrayConverter(...arr) {
}

describe('Combine arrays and convert strings to integers', () => {
  it('can take in a variable number of arrays and return a single array', () => {
    const arr1 = ['1', '5', '9'];
    const arr2 = ['10', '2', '7', '10'];
    const arr3 = ['3', '4', '0'];
    expect(arrayConverter(arr1, arr2, arr3).length).toEqual(10);
    expect(arrayConverter(arr1)[0]).toEqual(1);
  });
});
