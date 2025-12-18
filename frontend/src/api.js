const BASE_URL = "http://localhost:8090/api/inventory";

export async function getInventories() {
  const res = await fetch(`${BASE_URL}`);
  return res.json();
}

export async function getInventory(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json;
}

export async function createInventory(inventory) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventory),
  });
  return res.json;
}

export async function updateInventory(id, inventory) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventory),
  });
  return res.json;
}

export async function deleteInventory(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
