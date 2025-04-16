// @ts-check

/** @param {arr[]} arr */
function compact (arr: string[]) {
  if (arr.length > 10) {
    return arr.slice(0, 10)
  }

  return arr
}