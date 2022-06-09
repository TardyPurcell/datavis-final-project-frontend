import { Component } from "react";
import { Form } from "semantic-ui-react";

export default class FormSongSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      who: null,
      artist: null,
      album: null,
      song: null,
      userOptions: Object.keys(this.props.tree).map((user) => ({
        key: user,
        value: user,
        text: user,
      })),
      artistOptions: [],
      albumOptions: [],
      songOptions: [],
    };
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Form.Dropdown
              label="Choose User"
              placeholder="All Users"
              fluid
              search
              selection
              clearable={!this.state.artist}
              options={this.state.userOptions}
              onChange={(e, data) => {
                this.setState({
                  who: data.value,
                  artist: null,
                  album: null,
                  song: null,
                });
                if (data.value) {
                  this.setState({
                    artistOptions: Object.keys(this.props.tree[data.value]).map(
                      (artist) => ({
                        key: artist,
                        value: artist,
                        text: artist,
                      })
                    ),
                  });
                } else {
                  this.setState({
                    who: null,
                    artistOptions: [],
                  });
                }
              }}
            />
          </Form.Field>
          <Form.Field>
            <Form.Dropdown
              label="Choose Artists"
              placeholder="All Artists"
              fluid
              search
              selection
              clearable={!this.state.album}
              options={this.state.artistOptions}
              onChange={(e, data) => {
                this.setState({
                  artist: data.value,
                  album: null,
                  song: null,
                });
                if (data.value) {
                  this.setState({
                    albumOptions: Object.keys(
                      this.props.tree[this.state.who][data.value]
                    ).map((album) => ({
                      key: album,
                      value: album,
                      text: album,
                    })),
                  });
                } else {
                  this.setState({
                    artist: null,
                    albumOptions: [],
                  });
                }
              }}
            />
          </Form.Field>
          <Form.Field>
            <Form.Dropdown
              label="Choose Albums"
              placeholder="All Albums"
              fluid
              search
              selection
              clearable={!this.state.song}
              options={this.state.albumOptions}
              onChange={(e, data) => {
                this.setState({
                  album: data.value,
                  song: null,
                });
                if (data.value) {
                  this.setState({
                    songOptions: Object.keys(
                      this.props.tree[this.state.who][this.state.artist][
                        data.value
                      ]
                    ).map((song) => ({
                      key: song,
                      value: song,
                      text: song,
                    })),
                  });
                } else {
                  this.setState({
                    album: null,
                    songOptions: [],
                  });
                }
              }}
            />
          </Form.Field>
          <Form.Field hidden={this.state.hideSong}>
            <Form.Dropdown
              label="Choose Songs"
              placeholder="All Songs"
              fluid
              search
              selection
              clearable
              options={this.state.songOptions}
              onChange={(e, data) => {
                data.value
                  ? this.setState({ song: data.value })
                  : this.setState({ song: null });
              }}
            />
          </Form.Field>
          <Form.Button
            primary
            type="submit"
            loading={this.state.loading}
            disabled={this.state.loading}
            onClick={() => {
              this.setState({ loading: true });
              let sel = {
                who: this.state.who,
                artist: this.state.artist,
                album: this.state.album,
                song: this.state.song,
              };
              this.props.handleSubmit(sel, () =>
                this.setState({ loading: false })
              );
            }}
          >
            Confirm
          </Form.Button>
        </Form>
      </div>
    );
  }
}
