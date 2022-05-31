import TheHeader from "./TheHeader";
import TheChart from "./TheChart";
import TheMenu from "./TheMenu";
import TheUpload from "./TheUpload";
import { Divider } from "semantic-ui-react";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tree: null };
  }
  render() {
    return (
      <div className="App">
        <TheHeader />
        <Divider hidden />
        <TheUpload
          handleFileLoad={(tree) => {
            this.setState({ tree });
          }}
        />
        <Divider hidden />
        <TheMenu tree={this.state.tree} />
        <TheChart />
      </div>
    );
  }
}
