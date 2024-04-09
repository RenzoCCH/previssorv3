export type subsFn = (..._: unknown[]) => void;
type events = {
  [key: string]: { [key: string]: subsFn };
};
const events: events = {};
let eventId = 0;

const addRegister = (cb: subsFn, id: string, type: string): void => {
  if (!type) {
    return;
  }
  if (!events[type]) {
    events[type] = {};
  }
  if (!events[type][id]) {
    events[type][id] = cb;
  }
};

const removeRegister = (id: string, type: string) => {
  if (events[type] && events[type][id]) {
    delete events[type][id];
  }
};

export const triggerEvt = (type: string, ...data: unknown[]) => {
  if (!type) return;
  if (!events[type]) return;
  for (const [, value] of Object.entries(events[type])) {
    value(...data);
  }
};

export const unsubscribeEvt = (id: string, type: string) => {
  if (Array.isArray(type)) {
    type.forEach((t) => removeRegister(id, t));
  } else {
    removeRegister(id, type);
  }
};

export const subscribeEvt = (
  cb: subsFn,
  type: string,
  id: string = cb.name
) => {
  if (!type) return;
  if (!id) {
    id = "event" + eventId;
    eventId++;
  }
  if (Array.isArray(type)) {
    type.forEach((t) => addRegister(cb, id, t));
  } else {
    addRegister(cb, id, type);
  }
  return id;
};
