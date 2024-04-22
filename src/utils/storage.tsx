const cacheTime = 30000; //30 seconds cache;
export function localRestore(itemKey: string, cache: boolean = true) {
  let obj = null;
  try {
    const dataStored = localStorage.getItem(itemKey);
    if (dataStored) {
      const { data, savedAt } = JSON.parse(dataStored);

      if (cache && cacheTime > Date.now() - savedAt) {
        obj = data;
      }
    }
  } catch (err) {
    throw new Error("Some json bro the local storage");
  }

  return obj;
}

export function localStore(itemKey: string, obj: object) {
  localStorage.setItem(
    itemKey,
    JSON.stringify({ data: obj, savedAt: Date.now() })
  );
}

export function localRemove(itemKey: string) {
  localStorage.removeItem(itemKey);
}

export function localClear() {
  localStorage.clear();
}
