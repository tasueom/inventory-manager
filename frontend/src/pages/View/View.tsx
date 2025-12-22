import { useEffect, useState } from "react";
import {
  getInventories,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventory,
  searchInventory,
} from "../../api";
import { Inventory } from "../../types";
import "./View.css";

function View() {
  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [keyword, setKeyword] = useState("");

  const loadInventories = async () => {
    try {
      setLoading(true);
      setErrorMsg(""); // A) 요청 시작 시 초기화

      const data = await getInventories();
      setInventories(data);
    } catch (err: any) {
      setErrorMsg(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const price = Number(unitPrice);
    const quant = Number(quantity);

    try {
      const inventoryData = { name, unitPrice: price, quantity: quant };
      if (editingId === null) {
        await createInventory(inventoryData);
      } else {
        await updateInventory(editingId, inventoryData);
        setEditingId(null);
      }
      setName("");
      setUnitPrice("");
      setQuantity("");

      await loadInventories();

      setErrorMsg("");
    } catch (err: any) {
      setErrorMsg(err?.message);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg("");

      if (!keyword.trim()) {
        loadInventories();
        return;
      } else {
        const data = await searchInventory(keyword);
        setInventories(data);
      }
    } catch (err: any) {
      setErrorMsg(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const i = await getInventory(id);
      setEditingId(i.id);
      setName(i.name);
      setUnitPrice(i.unitPrice);
      setQuantity(i.quantity);

      setErrorMsg("");
    } catch (err: any) {
      setErrorMsg(err?.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setUnitPrice("");
    setQuantity("");
    setErrorMsg("");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    try {
      await deleteInventory(id);
      await loadInventories();
      setErrorMsg("");
    } catch (err: any) {
      setErrorMsg(err?.message);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">상품 목록</h2>
      {errorMsg && <div className="error-box">{errorMsg}</div>}
      <form className="product-form form-container" onSubmit={handleSubmit}>
        {editingId === null ? (
          <h3>신규 상품 등록</h3>
        ) : (
          <h3>[{editingId}] 정보 수정</h3>
        )}
        <div className="form-row">
          <div className="form-field">
            <input
              type="text"
              className="form-input"
              placeholder="상품명"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <input
              type="number"
              className="form-input"
              placeholder="가격"
              value={unitPrice}
              onChange={(e) =>
                setUnitPrice(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </div>
          <div className="form-field">
            <input
              type="number"
              className="form-input"
              placeholder="수량"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              className="form-input"
              placeholder="총액"
              value={
                Number(unitPrice) * Number(quantity) === 0
                  ? ""
                  : Number(unitPrice) * Number(quantity)
              }
              readOnly
            />
          </div>
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            {editingId === null ? "저장" : "수정"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
            >
              수정 취소
            </button>
          )}
        </div>
      </form>
      <form className="search-form form-container" onSubmit={handleSearch}>
        <h3>상품 검색</h3>
        <div className="search-input-group">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">검색</button>
        </div>
      </form>
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
              <td colSpan={6}>로딩 중...</td>
            </tr>
          ) : inventories.length === 0 ? (
            <tr>
              <td colSpan={6}>데이터가 없습니다.</td>
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
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(i.id)}
                  >
                    수정
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(i.id)}
                  >
                    삭제
                  </button>
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
