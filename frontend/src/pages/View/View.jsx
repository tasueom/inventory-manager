import { useEffect, useState } from "react";
import {
  getInventories,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../../api";
import "./View.css";

function View() {
  const [name, setName] = useState("");
  const [unitPrice, setUntPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

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

    if (editingId === null) {
      await createInventory({ name, unitPrice, quantity });
    } else {
      await updateInventory(editingId, { name, unitPrice, quantity });
      setEditingId(null);
    }

    setName("");
    setUntPrice(0);
    setQuantity(0);

    loadInventories();
  };

  const handleEdit = (i) => {
    setEditingId(i.id);
    setName(i.name);
    setUntPrice(i.unitPrice);
    setQuantity(i.quantity);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setUntPrice("");
    setQuantity("");
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
        {editingId === null ? (
          <h3>신규 상품 등록</h3>
        ) : (
          <h3>[{editingId}] 정보 수정</h3>
        )}
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
          <td>
            <input
              type="text"
              placeholder="총액"
              value={unitPrice * quantity === 0 ? "" : unitPrice * quantity}
              readOnly
            />
          </td>
        </tr>
        <div className="btn-group">
          <button onClick={handleSubmit}>
            {editingId === null ? "저장" : "수정"}
          </button>
          {editingId && <button onClick={cancelEdit}>수정 취소</button>}
        </div>
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
                  <button onClick={() => handleEdit(i)}>수정</button>
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
