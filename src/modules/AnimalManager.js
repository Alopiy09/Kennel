import settings from "./settings";

export default {
  get(id) {
    return fetch(`${settings.remoteURL}/animals/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${settings.remoteURL}/animals`).then(e => e.json())
  },

  addNewAnimal(newAnimal) {
    return fetch(`${settings.remoteURL}/animals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAnimal)
    }).then(data => data.json())
}
}


