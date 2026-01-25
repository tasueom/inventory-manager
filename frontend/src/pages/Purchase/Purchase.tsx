import { useEffect, useMemo, useState } from "react";
import { getInventories, purchaseInventory } from "../../api";
import { Inventory } from "../../types";
import "./Purchase.css";

function Purchase() {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [amountById, setAmountById] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const inventoryMap = useMemo(() => {
    const map = new Map<number, Inventory>();
    inventories.forEach((item) => map.set(item.id, item));
    return map;
  }, [inventories]);

  const loadInventories = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
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

  const handleAmountChange = (id: number, value: string) => {
    setAmountById((prev) => ({ ...prev, [id]: value }));
  };

  const handlePurchase = async (id: number) => {
    const current = inventoryMap.get(id);
    const rawAmount = amountById[id] ?? "";
    const amount = Number(rawAmount);

    if (!current) return;

    if (!rawAmount || Number.isNaN(amount) || amount <= 0) {
      setErrorMsg("구매수량을 올바르게 입력해주세요.");
      return;
    }

    if (amount > current.quantity) {
      setErrorMsg("남은 수량보다 많이 구매할 수 없습니다.");
      return;
    }

    try {
      setErrorMsg("");
      await purchaseInventory(id, amount);
      setAmountById((prev) => ({ ...prev, [id]: "" }));
      await loadInventories();
    } catch (err: any) {
      setErrorMsg(err?.message);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">상품 구매</h2>
      {errorMsg && <div className="error-box">{errorMsg}</div>}

      <table id="list-table" className="purchase-table">
        <thead>
          <tr>
            <th>품번</th>
            <th>상품명</th>
            <th>단가</th>
            <th>재고</th>
            <th>구매 수량</th>
            <th>구매</th>
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
            inventories.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity}</td>
                <td>
                  <input
                    className="form-input purchase-amount-input"
                    type="number"
                    min={1}
                    max={item.quantity}
                    value={amountById[item.id] ?? ""}
                    onChange={(e) => handleAmountChange(item.id, e.target.value)}
                    placeholder="수량"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handlePurchase(item.id)}
                    disabled={item.quantity <= 0}
                  >
                    구매
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

export default Purchase;
