import "./App.css";
import Layout from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { store } from "hooks/store";

const App: React.FC = () => {
  return (
    <Router>
      <StoreProvider store={store}>
        <Layout />
      </StoreProvider>
    </Router>
  );
};

export default App;
