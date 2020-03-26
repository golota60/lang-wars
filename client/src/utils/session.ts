export function getFromStorage(key: string) {
  if (!key) {
    return null;
  }

  try {
    const storageValue = sessionStorage.getItem(key);
    if (storageValue) {
      return JSON.parse(storageValue);
    }
  } catch (err) {
    console.log(err);
  }

  return null;
}

export function setInStorage(key: string, object: any) {
  if (!key) {
    console.error(`Error: key is missing`);
  }

  try {
    sessionStorage.setItem(key, JSON.stringify(object));
  } catch (err) {
    console.log(err);
  }
}
