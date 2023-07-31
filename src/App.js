import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import Loading from "./pages/Loading/Loading";
import Login from "./pages/Login/Login";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";
import Page404 from "./pages/Page404/Page404";
import UserManagement from "./pages/UserManagement/UserManagement";
import AdminTemplate from "./template/AdminTemplate";
import UserTemplate from "./template/UserTemplate";
import FilmManagement from "./pages/FilmsManagement/FilmManagement";
import AddPhimPages from "./pages/FilmsManagement/AddPhimPages";
import EditPhimPages from "./pages/FilmsManagement/EditPhimPages";
import MovieDetail1 from "./pages/MovieDetail1/MovieDetail1";
import TicketBook from "./Components/TicketBook/TicketBook";
import Register from "./pages/Register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/detail/:maPhim" element={<MovieDetail1 />}>
            <Route path="booking/:maLichChieu" element={<TicketBook />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminTemplate />}>
          <Route key={1} path="/admin/user" element={<UserManagement />} />
          <Route key={2} path="/admin/movie" element={<FilmManagement />} />
          <Route key={3} path="/admin/addphim" element={<AddPhimPages />} />
          <Route key={4} path="/admin/edit">
            <Route path=":id" element={<EditPhimPages />} />
          </Route>
        </Route>
        <Route path="/admin-login" element={<LoginAdmin />}></Route>
        <Route path="*" element={<Page404 />}></Route>
        <Route path="loading" element={<Loading />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
