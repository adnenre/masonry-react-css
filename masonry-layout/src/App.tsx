import Masonry from "./components/Masonry";
import items from "./data";
const App = () => {
  return (
    <div>
      <h1 className="title">Masonry Layout with React and CSS</h1>
      <Masonry items={items} />
    </div>
  );
};

export default App;
