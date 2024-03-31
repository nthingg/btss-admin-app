import { ApolloProvider } from "@apollo/client";
import client from ".//services/apollo/config";
import SideBar from ".//components/widgets/SideBar";
import HomePage from ".//pages/home/HomePage";
import EmulatorPage from ".//pages/home/EmulatorPage";
import AccountPage from "./pages/account/AccountPage";
import AccountProfilePage from "./pages/account/AccountProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import DestinationPage from "./pages/destination/DestinationPage";
import DestinationDetailPage from "./pages/destination/DestinationDetailPage";
import PlanPage from "./pages/plan/PlanPage";
import PlanDetailPage from "./pages/plan/PlanDetailPage";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

const App = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <ApolloProvider client={client}>
      <div className="app">
        <div style={!token ? { display: "none" } : { display: "block" }}>
          <SideBar />
        </div>
        <main className={token ? "content" : "loginContent"}>
          <Routes>
            <Route
              path="/"
              element={token ? <HomePage /> : <Navigate to="/login" />}
            ></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="destinations">
              <Route
                index
                element={token ? <DestinationPage /> : <Navigate to="/login" />}
              />
              <Route
                path=":destinationId"
                element={<DestinationDetailPage />}
              />
            </Route>
            <Route path="plans">
              <Route
                index
                element={token ? <PlanPage /> : <Navigate to="/login" />}
              />
              <Route path=":planId" element={<PlanDetailPage />} />
              <Route path="traveler-info">
                <Route path=":travelerId" element={<AccountProfilePage />} />
              </Route>
            </Route>
            <Route path="accounts">
              <Route
                index
                element={token ? <AccountPage /> : <Navigate to="/login" />}
              />
            </Route>
            <Route
              path="emulator"
              element={token ? <EmulatorPage /> : <Navigate to="/login" />}
            ></Route>
            {/* <Route
              path="test"
              element={token ? <Test /> : <Navigate to="/login" />}
            ></Route> */}
          </Routes>
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;
