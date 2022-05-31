import React, { Component } from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import TheStatistics from "./TheStatistics";

export default class TheUpload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      load: "waiting",
      filepath: "",
      cntUser: 0,
      cntArtist: 0,
      cntAlbum: 0,
      cntSong: 0,
    };
  }
  render() {
    let { cntUser, cntArtist, cntAlbum, cntSong } = this.state;
    return (
      <Segment padded>
        <Grid columns={2} verticalAlign={"middle"}>
          <Grid.Column>
            <input
              type={"file"}
              ref={this.fileInput}
              hidden
              onChange={(e) => {
                this.setState({ filepath: e.target.value });
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
            <Button
              positive
              content="Choose File"
              labelPosition="left"
              icon="file"
              onClick={() => {
                if (this.fileInput) this.fileInput.current?.click();
              }}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
