import "./App.css";
import Layout from "./Layout/Layout";

export type Track = {
  id: number;
  name: string;
  author: string;
  image: string;
  album: string;
  track: string;
  duration: number;
};

export type PlayList = {
  id: number;
  name: string;
  image: string;
  tracks: Track[];
};

const App: React.FC = () => {
  return <Layout />;
};

export default App;
