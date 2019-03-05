import settings from "./settings";


export default {
  get(id) {
    return fetch(`${settings.remoteURL}/locations/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${settings.remoteURL}/locations`).then(e => e.json())
  }
}