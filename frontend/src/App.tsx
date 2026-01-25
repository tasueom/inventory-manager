import { ReactNode, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import View from "./pages/View/View";
import Purchase from "./pages/Purchase/Purchase";

type Role = "admin" | "user";

interface RoleGateProps {
  role: Role;
  allowedRole: Role;
  children: ReactNode;
}

function RoleGate({ role, allowedRole, children }: RoleGateProps) {
  if (role !== allowedRole) {
    const message =
      allowedRole === "admin"
        ? "관리자 전용 페이지입니다."
        : "일반회원 전용 페이지입니다.";

    return <div className="role-guard">{message}</div>;
  }

  return <>{children}</>;
}

function App() {
  const [role, setRole] = useState<Role>("admin");

  const toggleRole = () => {
    setRole((prev) => (prev === "admin" ? "user" : "admin"));
  };

  return (
    <>
      <Header role={role} onToggleRole={toggleRole} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/view"
            element={
              <RoleGate role={role} allowedRole="admin">
                <View />
              </RoleGate>
            }
          />
          <Route
            path="/purchase"
            element={
              <RoleGate role={role} allowedRole="user">
                <Purchase />
              </RoleGate>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
