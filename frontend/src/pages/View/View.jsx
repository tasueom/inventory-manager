import { useEffect, useState } from "react";
import { getInventories, createInventory, deleteInventory } from "../../api";
import "./View.css";

function View() {
  const [name, setName] = useState("");
  const [unitPrice, setUntPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInventories = async () => {
    const data = await getInventories();
    setInventories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadInventories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createInventory({ name, unitPrice, quantity });

    setName("");
    setUntPrice(0);
    setQuantity(0);

    loadInventories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    await deleteInventory(id);
    await loadInventories();
  };

  return (
    <div className="page-container">
      <h2>상품 목록</h2>
      <table>
        <tr>
          <td>
            <input
              type="text"
              placeholder="상품명"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="가격"
              value={unitPrice}
              onChange={(e) => setUntPrice(Number(e.target.value))}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="수량"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </td>
        </tr>
        <button onClick={handleSubmit}>저장</button>
      </table>
      <table id="list-table">
        <thead>
          <tr>
            <th>품번</th>
            <th>품명</th>
            <th>단가</th>
            <th>수량</th>
            <th>총액</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5}>로딩 중...</td>
            </tr>
          ) : inventories.length === 0 ? (
            <tr>
              <td colSpan="5">데이터가 없습니다.</td>
            </tr>
          ) : (
            inventories.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.unitPrice}</td>
                <td>{i.quantity}</td>
                <td>{i.totalPrice}</td>
                <td>
                  <button onClick={() => handleDelete(i.id)}>삭제</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default View;
