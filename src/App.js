import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { DataProvider } from './context/DataContext';
import { Navigate } from "react-router-dom";
import UserAuth from "./layouts/UserAuth";
import OLayout from "./ownerLayouts/OLayout";
import PrivateRoute from "./components/PrivateRoute";
import HotelDetail from "./layouts/HotelDetail";
import UserDashboard from "./layouts/UserDashboard";
import Dashboard from "./ownerLayouts/Dashboard";
import StartPage from "./layouts/StartPage";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
          <Routes>
              <Route path="/auth" element={<UserAuth/>} />
              <Route path="/" element={<StartPage/>} />
              <Route path="/jul" element={<Dashboard/>} />

              <Route path="/hotelhome/:uid" element={<PrivateRoute/>} >
                <Route path="" element={<OLayout />} />
              </Route>

              <Route path="/userhome/:uid" element={<PrivateRoute/>} >
                <Route path="" element={<Layout />} />
              </Route>

              <Route path="/userprofile" element={<PrivateRoute/>} >
                <Route path="" element={<UserDashboard />} />
              </Route>

              <Route path="/singlehotel/:uid" element={<PrivateRoute/>} >
                <Route path="" element={<HotelDetail/>}/>
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </DataProvider>
    </BrowserRouter>
  );
}

export default App;
