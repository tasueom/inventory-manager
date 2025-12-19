import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <header>
        <h1>재고 관리 시스템</h1>
      </header>
      <nav>
        <ul>
          <li><Link to="/">홈</Link></li>
          <li><Link to="/view">상품 목록</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
