// src/utils/invStore.js
const STORAGE_KEY = "inv_list";

export function loadInvList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(raw);
  } catch {}
}

export function saveInvList(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list || []));
}
