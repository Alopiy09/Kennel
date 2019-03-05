import settings from "./settings";

export default {
  get(id) {
    return fetch(`${settings.remoteURL}/employees/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${settings.remoteURL}/employees`).then(e => e.json())
  },

  addNewEmployee(newEmployee) {
    return fetch(`${settings.remoteURL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEmployee)
    }).then(data => data.json())
  }
}