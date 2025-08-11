// see: https://www.codewars.com/kata/54c9fcad28ec4c6e680011aa/javascript
export default function isMerge(str: string, a: string, b: string): boolean {
  const memo = new Set<string>()
  return check(str, a, b, 0, 0, memo)
}

function check(
  str: string,
  a: string,
  b: string,
  x: number,
  y: number,
  memo: Set<String>
): boolean {
  // if the sum of the part pointers is the length of the string
  if (x + y === str.length) {
    // check that the pointers are al;so at the end of their parts
    return x === a.length && y === b.length
  }

  // if the memo has seen this step before continue
  const key = `${x},${y}`
  if (memo.has(key)) return false

  let matchA = false
  let matchB = false

  // if a pointer is still within a
  // and the char in the whole string is same as in the part
  if (x < a.length && str[x + y] === a[x]) {
    matchA = check(str, a, b, x + 1, y, memo)
  }
  // do the same checks for part b
  if (y < b.length && str[x + y] === b[y]) {
    matchB = check(str, a, b, x, y + 1, memo)
  }

  // if there was no match, add the key to the memo cache
  if (!(matchA || matchB)) memo.add(key)

  // return true if a match was found
  return matchA || matchB
}
