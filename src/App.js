import TheHeader from "./TheHeader";
import TheChart from "./TheChart";
import TheMenu from "./TheMenu";
import TheUpload from "./TheUpload";
import { Divider } from "semantic-ui-react";
import { Component } from "react";
import axios from "axios";
import { API_URL } from "./utils/url";
import pieOps from "./utils/chartops";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: null,
      chart1: null,
      chart2: null,
      error: null,
    };
  }
  getData = async (sel, type) => {
    let data;
    if (type === "frequency") {
      let res = await axios.get(`${API_URL}/frequency`, { params: sel });
      data = {
        legendData: res.data.cnt.map((entry) => entry.word),
        seriesData: res.data.cnt.map((entry) => ({
          name: entry.word,
          value: entry.count,
        })),
      };
      data = pieOps(data);
    } else if (type === "wordcloud") {
    } else if (type === "stream") {
    } else if (type === "emotion") {
    } else {
    }
    return data;
  };
  clearChart = () => {
    this.setState({ chart1: null, chart2: null });
  };
  handleSubmit = async (sel, id, type, callback) => {
    try {
      if (id === "chart1") {
        let chart1 = await this.getData(sel, type);
        this.setState({ chart1 });
      } else {
        let chart2 = await this.getData(sel, type);
        this.setState({ chart2 });
      }
    } finally {
      callback();
    }
  };
  render() {
    if (this.state.tree === null) {
      if (this.state.error) return this.state.error;
      axios
        .get(`${API_URL}/init`)
        .then((res) => {
          this.setState({ tree: res.data });
        })
        .catch((err) => this.setState({ error: err.response.data }));
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <TheHeader />
        <Divider hidden />
        <TheUpload
          tree={this.state.tree}
          handleUpload={(tree) => {
            this.setState({ tree });
          }}
        />
        <Divider hidden />
        <TheMenu
          tree={this.state.tree}
          handleSubmit={this.handleSubmit}
          clearChart={this.clearChart}
        />
        <TheChart chart1={this.state.chart1} chart2={this.state.chart2} />
      </div>
    );
  }
}
