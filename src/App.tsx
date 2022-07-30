import "./App.css";
import Layout from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { store } from "hooks/store";
import { PlaceholderContextProvider } from "components/Placeholder/PlaceholderContext";
import { DragDropContextProvider } from "components/DragDrop/DragDropContext";

const App: React.FC = () => {
  return (
    <Router>
      <StoreProvider store={store}>
        <PlaceholderContextProvider>
          <DragDropContextProvider>
            <Layout />
          </DragDropContextProvider>
        </PlaceholderContextProvider>
      </StoreProvider>
    </Router>
  );
};

export default App;
