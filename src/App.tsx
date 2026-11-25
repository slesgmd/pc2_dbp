import {Link, Navigate, outlet, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import List from "./pages/List";
import Detail from "./pages/Detail";

function Protected(){
  const navigate = useNavigate();
  if(!localStorage.getItem("token")){
    return <Navigate to="/login" />;
    const logout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

    return (
      <div> 
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
          <Link to="/spaces" className="text-blue-600 font-bold">Campus Cultura</Link>
          <button onClick={logout} className="bg-red-500 text-white p-2 rounded">Logout</button>
        </nav>
        <main className="maz-w-3xl mx-auto p-6"><outlet /></main>
      </div>

  );}
  export default function App() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/spaces" element={<Protected />}>
          <Route index element={<List />} />
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="*" element={<Navigate to="/activities" />} />
      </Routes>
    );
  }
}