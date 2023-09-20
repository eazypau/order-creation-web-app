//ref:https://bobbyhadz.com/blog/javascript-string-replace-character-at-index
export function replaceCharacter(
  string: string,
  index: number,
  replacement: string
) {
  return (
    string.slice(0, index) +
    replacement +
    string.slice(index + replacement.length)
  );
}
