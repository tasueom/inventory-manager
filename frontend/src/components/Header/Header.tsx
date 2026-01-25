import { Link } from "react-router-dom";
import "./Header.css";

type Role = "admin" | "user";

interface HeaderProps {
  role: Role;
  onToggleRole: () => void;
}

function Header({ role, onToggleRole }: HeaderProps) {
  return (
    <>
      <header>
        <h1>재고 관리 시스템</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/view">상품 목록</Link>
          </li>
          <li>
            <Link to="/purchase">상품 구매</Link>
          </li>
          <li className="role-toggle-item">
            <button type="button" className="role-toggle" onClick={onToggleRole}>
              {role === "admin" ? "관리자 모드" : "일반회원 모드"}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
