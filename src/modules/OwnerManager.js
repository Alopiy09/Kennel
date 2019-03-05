import settings from "./settings";


export default {
  get(id) {
    return fetch(`${settings.remoteURL}/owners/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${settings.remoteURL}/owners`).then(e => e.json())
  },
}