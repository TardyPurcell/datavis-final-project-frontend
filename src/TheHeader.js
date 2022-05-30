import React from "react";
import { Header, Icon } from "semantic-ui-react";

const TheHeader = () => (
  <Header as="h2">
    <Icon name="chart pie" />
    <Header.Content>
      歌词文本数据可视化
      <Header.Subheader>迟云帆 唐明珑</Header.Subheader>
    </Header.Content>
  </Header>
);

export default TheHeader;
