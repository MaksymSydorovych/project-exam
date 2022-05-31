import Layout from "./components/layout/Layout";
import "./sass/style.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
	return (
		<>
			<AuthProvider>
				<Router>
					<Layout />
				</Router>
			</AuthProvider>
		</>
	);
}

export default App;
