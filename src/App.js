import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Misc/Header";
import Sidebar from "./components/Misc/Sidebar";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import { AppProvider } from "./Context/AppContext";
import config from "./config.json";
import "./assets/script";

function App() {
  return (
    <div className="main-wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <AppProvider>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
          </AppProvider>
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
