import React, { Component } from "react";
import { Statistic } from "semantic-ui-react";

export default class TheStatistics extends Component {
  render() {
    return (
      <div>
        <Statistic.Group size={"tiny"} widths={4}>
          <Statistic>
            <Statistic.Value>{this.props.cntUser}</Statistic.Value>
            <Statistic.Label>Users</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.props.cntArtist}</Statistic.Value>
            <Statistic.Label>Artists</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.props.cntAlbum}</Statistic.Value>
            <Statistic.Label>Albums</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.props.cntSong}</Statistic.Value>
            <Statistic.Label>Songs</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    );
  }
}
