import TheHeader from "./TheHeader";
import TheChart from "./TheChart";
import TheMenu from "./TheMenu";
import TheUpload from "./TheUpload";
import { Divider } from "semantic-ui-react";
import { Component } from "react";
import axios from "axios";
import { API_URL } from "./utils/url";
import {
  pieOps,
  wordcloudOps,
  treeOps,
  streamOps,
  mapOps,
  radarOps,
} from "./utils/chartops";

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
      let res = await axios.get(`${API_URL}/frequency`, { params: sel });
      data = res.data.cnt.map((entry) => ({
        name: entry.word,
        value: entry.count,
      }));
      data = wordcloudOps(data);
    } else if (type === "stream") {
      let reqList = [];
      let idxList = [];
      for (let song of Object.keys(
        this.state.tree[sel.who][sel.artist][sel.album]
      )) {
        sel.song = song;
        idxList.push(this.state.tree[sel.who][sel.artist][sel.album][song]);
        reqList.push(axios.get(`${API_URL}/emo`, { params: sel }));
      }
      let resList = await axios.all(reqList);
      data = [];
      resList.forEach((res, i) =>
        data.push.apply(data, [
          [idxList[i], res.data.emo5.Angry, "Angry"],
          [idxList[i], res.data.emo5.Fear, "Fear"],
          [idxList[i], res.data.emo5.Happy, "Happy"],
          [idxList[i], res.data.emo5.Sad, "Sad"],
          [idxList[i], res.data.emo5.Surprise, "Surprise"],
        ])
      );
      data = streamOps(data);
    } else if (type === "emotion") {
      let res = await axios.get(`${API_URL}/emo`, { params: sel });
      data = Object.values(res.data.emo5);
      data = radarOps(data);
    }
    return data;
  };

  clearChart = (cluster) => {
    this.setState({ chart1: null, chart2: null, cluster });
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
          handleCluster={async (k, activeItem, callback) => {
            try {
              if (activeItem === "cluster") {
                let resp = await axios.get(`${API_URL}/kMeans`, {
                  params: { k },
                });
                let chart1 = treeOps(resp.data);
                this.setState({ chart1 });
              } else {
                // if (!Number.isInteger(k)) {
                //   return "k must be an integer";
                // }
                if (k < 1) {
                  return "k must be greater than 0";
                }
                let resp = await axios.get(`${API_URL}/fmap`);
                let chart1 = mapOps(resp.data.data, k);
                this.setState({ chart1 });
              }
            } catch (err) {
              return err.response.data;
            } finally {
              callback();
            }
          }}
          clearChart={this.clearChart}
        />
        <TheChart
          chart1={this.state.chart1}
          chart2={this.state.chart2}
          cluster={this.state.cluster}
        />
      </div>
    );
  }
}
