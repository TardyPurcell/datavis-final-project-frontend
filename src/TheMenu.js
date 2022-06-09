import { Component } from "react";
import { Button, Divider, Grid, Input, Menu, Segment } from "semantic-ui-react";
import FormSongSelect from "./FormSongSelect";

export default class TheMenu extends Component {
  state = { activeItem: "frequency" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.clearChart();
  };

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
          <Menu.Item
            name="what"
            active={activeItem === "what"}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment relaxed="very">
          {activeItem === "cluster" ? (
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Input type="number" label="Number of clusters" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button primary>Show</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            <>
              <Grid columns={2} relaxed="very" stackable>
                <Grid.Column>
                  <FormSongSelect
                    hideSong={activeItem === "stream"}
                    tree={this.props.tree}
                    handleSubmit={(sel, callback) => {
                      this.props.handleSubmit(
                        sel,
                        "chart1",
                        this.state.activeItem,
                        callback
                      );
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <FormSongSelect
                    hideSong={activeItem === "stream"}
                    tree={this.props.tree}
                    handleSubmit={(sel, callback) => {
                      this.props.handleSubmit(
                        sel,
                        "chart2",
                        this.state.activeItem,
                        callback
                      );
                    }}
                  />
                </Grid.Column>
              </Grid>
              {/* <Divider vertical>vs</Divider> */}
            </>
          )}
        </Segment>
      </div>
    );
  }
}
