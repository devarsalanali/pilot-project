import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Login from './pages/auth/Login';
import Navbar from './components/dashboard/Navbar';
import Sidebar from './components/dashboard/Sidebar';
import Streams from './pages/dashboard/stream/Streams';
import Alerts from './pages/dashboard/breach/Alerts';
import Faces from './pages/dashboard/face/Faces';
import Cameras from './pages/dashboard/camera/Cameras';
const Dashboard = () => (
  <div>
    <div className="absolute w-full">
      <Navbar />
    </div>
    <div className="flex flex-col lg:flex-row gap-11 h-screen lg:pt-20 pt-36 lg:overflow-hidden">
      <div className="lg:w-3/12 w-full border-r lg:h-full lg:border-t bg-[#FAFAFA]">
        <Sidebar />
      </div>
      <div className="lg:w-9/12 w-full lg:overflow-auto">
        <Outlet />
      </div>
    </div>
  </div>
);

export default function AppRouter() {
  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="streams" element={<Streams />} />
          <Route path="breach/alerts" element={<Alerts />} />
          <Route path="cameras" element={<Cameras />} />
          <Route path="faces" element={<Faces />} />
        </Route>
      </Routes>
    </Router>
  );
}
