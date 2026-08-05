import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../components/layout/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Analytics from "../pages/analytics/Analytics";
import Trades from "../pages/trades/Trades";
import CreateTrade from "../pages/trades/CreateTrade";
import EditTrade from "../pages/trades/EditTrade";
import TradeDetails from "../pages/trades/TradeDetails";

import Profile from "../pages/profile/Profile";
import Settings from "../pages/Settings";

import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/token";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/trades" element={<Trades />} />

          <Route path="/trades/new" element={<CreateTrade />} />

          <Route path="/trades/:id" element={<TradeDetails />} />

          <Route path="/trades/:id/edit" element={<EditTrade />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
