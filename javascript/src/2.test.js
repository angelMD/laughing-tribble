function isPalindrome(str) {
}

describe('palindrome', () => {
  it('returns boolean based on if a str is a palindrome', () => {
    expect(isPalindrome('tacocat')).toBe(true);
    expect(isPalindrome('Tacocat')).toBe(true);
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('raCecar')).toBe(true);
    expect(isPalindrome('asdf')).toBe(false);
    expect(isPalindrome('someOtherWord')).toBe(false);
  });
});
