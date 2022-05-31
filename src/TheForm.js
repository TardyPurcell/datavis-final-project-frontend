import { Component } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default class TheForm extends Component {
  state = { artists: [], albums: [], songs: [] };

  render() {
    return (
      <div>
        <Segment>
          <Form>
            <Form.Field>
              <Form.Dropdown
                label="Choose Artists"
                placeholder="Artist"
                fluid
                multiple
                search
                selection
                options={this.props.artistOptions}
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
                multiple
                search
                selection
                options={this.props.albumOptions}
                onChange={(e, data) => {
                  this.setState({ albums: data.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Dropdown
                label="Choose Songs"
                placeholder="Song"
                fluid
                multiple
                search
                selection
                options={this.props.songOptions}
                onChange={(e, data) => {
                  this.setState({ songs: data.value });
                }}
              />
            </Form.Field>
            <Button type="submit">Confirm</Button>
          </Form>
        </Segment>
        <Segment raised>
          <p>{JSON.stringify(this.state)}</p>
        </Segment>
      </div>
    );
  }
}
