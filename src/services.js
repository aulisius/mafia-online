import pandora from "@faizaanceg/pandora";
let apiRunner = (...args) =>
  fetch(...args).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });

let baseUrl = "http://localhost:8080/api/game/";

export let gameService = {
  create: () =>
    apiRunner(baseUrl, {
      method: "PUT",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: pandora.get("username") })
    }),
  connect: code =>
    apiRunner(`${baseUrl}${code}`, {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: pandora.get("username") })
    })
};
