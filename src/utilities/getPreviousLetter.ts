const getPreviousLetter = (letter: string) => {
  return String.fromCharCode(letter.charCodeAt(0) - 1);
}

export { getPreviousLetter }