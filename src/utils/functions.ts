export const sleep = (ms: number) => {
  return new Promise(res => setTimeout(res, ms));
}

export const swap = (arr: number[], a: number, b: number) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}