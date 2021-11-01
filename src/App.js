import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Misc/Header";
import Sidebar from "./components/Misc/Sidebar";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import "./assets/script";
import { AppProvider } from "./Context/AppContext";
import io from "socket.io-client";
function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("http://34.240.246.145");
    setSocket(newSocket);
    console.log(newSocket);
    newSocket.io.on("error", (error) => {
      console.log(error);
      // ...
    });
    newSocket.io.on("notification", (data) => {
      // ...
      console.log(data);
    });
    return () => newSocket.close();
  }, [setSocket]);
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
