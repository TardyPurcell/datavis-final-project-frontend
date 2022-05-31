import { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="词频"
            active={activeItem === "frequency"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="词云"
            active={activeItem === "wordcloud"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="主题流"
            active={activeItem === "stream"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="聚类"
            active={activeItem === "cluster"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="情感分析"
            active={activeItem === "emotion"}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment>
          <img src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
        </Segment>
      </div>
    );
  }
}
