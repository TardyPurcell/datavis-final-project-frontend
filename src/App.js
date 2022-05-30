import TheHeader from "./TheHeader";
import TheForm from "./TheForm";
import TheChart from "./TheChart";

const artistOptions = [];

const albumOptions = [];

const songOptions = [];

function App() {
  return (
    <div className="App">
      <TheHeader />
      <TheForm
        artistOptions={artistOptions}
        albumOptions={albumOptions}
        songOptions={songOptions}
      />
      <TheChart />
    </div>
  );
}

export default App;
