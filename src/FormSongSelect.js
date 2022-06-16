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
              options={Object.keys(this.props.tree).map((user) => ({
                key: user,
                value: user,
                text: user,
              }))}
              value={this.state.who}
              onChange={(e, { value }) => {
                this.setState({
                  who: value,
                  artist: null,
                  artistOptions: null,
                  album: null,
                  albumOptions: null,
                  song: null,
                  songOptions: null,
                });
                if (value) {
                  this.setState({
                    artistOptions: Object.keys(this.props.tree[value]).map(
                      (artist) => ({
                        key: artist,
                        value: artist,
                        text: artist,
                      })
                    ),
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
              value={this.state.artist}
              onChange={(e, { value }) => {
                this.setState({
                  artist: value,
                  album: null,
                  albumOptions: null,
                  song: null,
                  songOptions: null,
                });
                if (value) {
                  this.setState({
                    albumOptions: Object.keys(
                      this.props.tree[this.state.who][value]
                    ).map((album) => ({
                      key: album,
                      value: album,
                      text: album,
                    })),
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
              value={this.state.album}
              onChange={(e, { value }) => {
                this.setState({
                  album: value,
                  song: null,
                  songOptions: null,
                });
                if (value) {
                  this.setState({
                    songOptions: Object.keys(
                      this.props.tree[this.state.who][this.state.artist][value]
                    ).map((song) => ({
                      key: song,
                      value: song,
                      text: song,
                    })),
                  });
                }
              }}
            />
          </Form.Field>
          <Form.Field hidden={this.props.hideSong}>
            <Form.Dropdown
              label="Choose Songs"
              placeholder="All Songs"
              fluid
              search
              selection
              clearable
              options={this.state.songOptions}
              value={this.state.song}
              onChange={(e, { value }) => {
                value
                  ? this.setState({ song: value })
                  : this.setState({ song: null });
              }}
            />
          </Form.Field>
          <Form.Button
            primary
            type="submit"
            loading={this.state.loading}
            disabled={
              this.state.loading || (this.props.hideSong && !this.state.album)
            }
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
