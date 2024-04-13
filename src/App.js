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
import ConfigurationPage from "./pages/configuration/ConfigurationPage";
import DestinationAddPage from "./pages/destination/DestinationAddPage";
import DestinationUpdatePage from "./pages/destination/DestinationUpdatePage";
import TransactionPage from "./pages/transactions/TransactionPage";

const App = () => {
  const token = localStorage.getItem("adminToken");

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
              <Route path="add" element={<DestinationAddPage />} />
              <Route
                path="update/:destinationId"
                element={<DestinationUpdatePage />}
              />
            </Route>
            <Route path="plans">
              <Route
                index
                element={token ? <PlanPage /> : <Navigate to="/login" />}
              />
              <Route path="sbs/:sbsNumber" element={<PlanPage />} />
              <Route path=":planId" element={<PlanDetailPage />} />
              <Route
                path=":planId/account/:accountId"
                element={<AccountProfilePage />}
              />
            </Route>
            <Route path="accounts">
              <Route
                index
                element={token ? <AccountPage /> : <Navigate to="/login" />}
              />
              <Route
                path=":accountId"
                element={<AccountProfilePage />}
              />
            </Route>
            <Route path="transactions">
              <Route
                index
                element={token ? <TransactionPage /> : <Navigate to="/login" />}
              />
            </Route>
            <Route
              path="emulator"
              element={token ? <EmulatorPage /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="configuration"
              element={token ? <ConfigurationPage /> : <Navigate to="/login" />}
            ></Route>
          </Routes>
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;
