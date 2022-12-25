export const generateRandomWord = (count: number): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
  let result = '';
  for (let i = 0; i < count; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
};
