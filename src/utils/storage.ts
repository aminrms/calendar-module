export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalStorage = (key: string) => {
  let result = null;
  try {
    result = JSON.parse(localStorage.getItem(key) as string);
  } catch {
    result = null;
  }
  return result;
};
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
