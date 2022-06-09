import axios from "axios";
import React, { Component } from "react";
import { Button, Grid, Message, Segment } from "semantic-ui-react";
import TheStatistics from "./TheStatistics";
import { API_URL } from "./utils/url";

export default class TheUpload extends Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.state = {
      loading: false,
      error: "",
      filepath: "",
    };
  }
  render() {
    let cntUser = 0,
      cntArtist = 0,
      cntAlbum = 0,
      cntSong = 0;
    for (let user of Object.entries(this.props.tree)) {
      ++cntUser;
      for (let artist of Object.entries(user[1])) {
        ++cntArtist;
        for (let album of Object.entries(artist[1])) {
          ++cntAlbum;
          cntSong += Object.entries(album[1]).length;
        }
      }
    }
    return (
      <Segment padded>
        <Grid columns={3} verticalAlign={"middle"}>
          <Grid.Column>
            <input
              type={"file"}
              ref={this.fileInput}
              accept={".csv"}
              hidden
              onChange={(e) => {
                this.setState({ filepath: e.target.value, loading: true });
                const param = new FormData();
                param.append("file", e.target.files[0]);
                const config = {
                  headers: { "Content-Type": "multipart/form-data" },
                };
                axios
                  .post(`${API_URL}/addData`, param, config)
                  .then((res) => {
                    this.setState({ loading: false, error: null });
                    this.props.handleUpload(res.data);
                  })
                  .catch((err) => {
                    this.setState({ loading: false, error: err.response.data });
                  });
              }}
            />
            <TheStatistics
              cntUser={cntUser}
              cntArtist={cntArtist}
              cntAlbum={cntAlbum}
              cntSong={cntSong}
            />
          </Grid.Column>
          <Grid.Column textAlign={"right"}>
            {this.state.filepath ? this.state.filepath : null}
          </Grid.Column>
          <Grid.Column textAlign={"right"}>
            <Button
              positive
              content="Choose File"
              labelPosition="left"
              icon="file"
              loading={this.state.loading}
              disabled={this.state.loading}
              onClick={() => {
                if (this.fileInput) this.fileInput.current?.click();
              }}
            />
          </Grid.Column>
        </Grid>
        <Message error hidden={!this.state.error}>
          <Message.Header>Error</Message.Header>
          <p>{this.state.error}</p>
        </Message>
      </Segment>
    );
  }
}
