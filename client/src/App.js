import "./App.css";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Landing from "./components/layouts/Landing.js";
import Auth from "./components/views/Auth.js";
import Dashboard from "./components/views/Dashboard.js";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import AuthContextProvider from "./contexts/AuthContext.js";
import About from "./components/views/About";
import PostContextProvider from "./contexts/PostContext";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <PostContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/login" element={<Auth authRoute="login" />} />
              <Route
                exact
                path="/register"
                element={<Auth authRoute="register" />}
              />
              <Route path="/*" element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route exact path="about" element={<About />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PostContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
