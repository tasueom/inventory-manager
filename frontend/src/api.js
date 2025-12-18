const BASE_URL = "http://localhost:8090/api/inventory";

async function checkError(res) {
  if (!res.ok) {
    const data = await res.json(); // {status, message} 기대
    throw { response: { data } }; // View의 err.response.data.message 유지
  }
}

export async function getInventories() {
  const res = await fetch(`${BASE_URL}`);
  await checkError(res);
  return await res.json();
}

export async function getInventory(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  await checkError(res);
  return await res.json();
}

export async function createInventory(inventory) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventory),
  });
  await checkError(res);
  return await res.json();
}

export async function updateInventory(id, inventory) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventory),
  });
  await checkError(res);
  return await res.json();
}

export async function deleteInventory(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  await checkError(res);
}
