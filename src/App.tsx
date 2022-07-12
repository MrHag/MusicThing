import "./App.css";
import Layout from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { store } from "hooks/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <Router>
      <StoreProvider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Layout />
        </DndProvider>
      </StoreProvider>
    </Router>
  );
};

export default App;
