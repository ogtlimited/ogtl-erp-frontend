import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Misc/Header";
import Sidebar from "./components/Misc/Sidebar";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import './assets/script'

function App() {

  return (
    <div className="main-wrapper">
      <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/employees" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
   
    </div>
  );
}

export default App;
