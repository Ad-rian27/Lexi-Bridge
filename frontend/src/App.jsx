import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./pages/UploadDocument";

function App() {
    const path = window.location.pathname;

    if (path === "/register") {
        return <Register />;
    }

    if (path === "/dashboard") {
        return <Dashboard />;
    }

    if (path === "/upload") {
        return <UploadDocument />;
    }

    return <Login />;
}

export default App;