import React, { Component } from "react";
import { Segment, Grid, Divider } from "semantic-ui-react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  SingleAxisComponent,
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  TransformComponent,
} from "echarts/components";
import {
  PieChart,
  TreeChart,
  ThemeRiverChart,
  ScatterChart,
  RadarChart,
} from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import "echarts-wordcloud";
import ecStat from "echarts-stat";

echarts.use([
  SingleAxisComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  TreeChart,
  ThemeRiverChart,
  CanvasRenderer,
  LabelLayout,
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  TransformComponent,
  ScatterChart,
  RadarChart,
]);

echarts.registerTransform(ecStat.transform.clustering);

export default class TheChart extends Component {
  render() {
    return !this.props.chart1 && !this.props.chart2 ? null : (
      <Segment>
        {this.props.cluster ? (
          <Grid textAlign="center" columns={1}>
            <Grid.Column textAlign="center">
              <ReactEChartsCore
                echarts={echarts}
                option={this.props.chart1}
                style={{ height: 800, width: "100%" }}
                ops={{ renderer: "svg" }}
              />
            </Grid.Column>
          </Grid>
        ) : (
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              {this.props.chart1 ? (
                <ReactEChartsCore
                  echarts={echarts}
                  option={this.props.chart1}
                  style={{ height: 600, width: "100%" }}
                  opts={{ renderer: "svg" }}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {this.props.chart2 ? (
                <ReactEChartsCore
                  echarts={echarts}
                  option={this.props.chart2}
                  style={{ height: 600, width: "100%" }}
                  opts={{ renderer: "svg" }}
                />
              ) : null}
            </Grid.Column>
          </Grid>
        )}
      </Segment>
    );
  }
}
