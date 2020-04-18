export function getFromStorage(key: string): string {
  if (!key) {
    return 'Key was not provided';
  }

  try {
    const storageValue = sessionStorage.getItem(key);
    if (storageValue) {
      return JSON.parse(storageValue);
    }
  } catch (err) {
    console.error(err);
  }
  return 'Item does not exist in sessionStorage';
}

export function setInStorage(key: string, object: string) {
  if (!key) {
    console.error(`Error: key is missing`);
  }

  try {
    sessionStorage.setItem(key, JSON.stringify(object));
  } catch (err) {
    console.error(err);
  }
}

export function deleteFromStorage(token: string) {
  if (!token) console.error('Error: Token was not provided');

  try {
    sessionStorage.removeItem(token);
  } catch (err) {
    console.error(err);
  }
}

export function getLangWarsToken() {
  return getFromStorage('lang-wars-token');
}

export function deleteLangWarsToken() {
  return deleteFromStorage('lang-wars-token');
}
