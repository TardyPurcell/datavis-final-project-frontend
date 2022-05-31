import { Component } from "react";
import { Button, Divider, Grid, Menu, Segment } from "semantic-ui-react";
import FormSongSelect from "./FormSongSelect";

export default class TheMenu extends Component {
  state = { activeItem: "frequency" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu tabular>
          <Menu.Item
            name="frequency"
            active={activeItem === "frequency"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="wordcloud"
            active={activeItem === "wordcloud"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="stream"
            active={activeItem === "stream"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="cluster"
            active={activeItem === "cluster"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="emotion"
            active={activeItem === "emotion"}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment relaxed>
          {activeItem === "cluster" ? (
            <Button primary>Show</Button>
          ) : (
            <>
              <Grid columns={2} relaxed="very" stackable>
                <Grid.Column>
                  <FormSongSelect
                    hideSong={activeItem === "stream"}
                    tree={this.props.tree}
                  />
                </Grid.Column>
                <Grid.Column>
                  <FormSongSelect
                    hideSong={activeItem === "stream"}
                    tree={this.props.tree}
                  />
                </Grid.Column>
              </Grid>
              <Divider vertical>vs</Divider>
            </>
          )}
        </Segment>
      </div>
    );
  }
}
