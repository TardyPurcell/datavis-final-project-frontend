import { Component } from "react";
import { Form } from "semantic-ui-react";

export default class FormSongSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { artist: null, album: null, song: null };
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Form.Dropdown
              label="Choose User"
              placeholder="User"
              fluid
              search
              selection
              options={this.props.userOption}
              onChange={(e, data) => {
                this.setState({ artists: data.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <Form.Dropdown
              label="Choose Artists"
              placeholder="Artist"
              fluid
              search
              selection
              options={this.props.artistOption}
              onChange={(e, data) => {
                this.setState({ artists: data.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <Form.Dropdown
              label="Choose Albums"
              placeholder="Album"
              fluid
              search
              selection
              options={this.props.albumOption}
              onChange={(e, data) => {
                this.setState({ albums: data.value });
              }}
            />
          </Form.Field>
          <Form.Field hidden={this.props.hideSong}>
            <Form.Dropdown
              label="Choose Songs"
              placeholder="Song"
              fluid
              search
              selection
              options={this.props.songOption}
              onChange={(e, data) => {
                this.setState({ songs: data.value });
              }}
            />
          </Form.Field>
          <Form.Button primary type="submit">
            Confirm
          </Form.Button>
        </Form>
      </div>
    );
  }
}
