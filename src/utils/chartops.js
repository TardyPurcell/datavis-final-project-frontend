export const pieOps = (data) => ({
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    type: "scroll",
    orient: "vertical",
    right: 10,
    top: 20,
    bottom: 20,
    data: data.legendData,
  },
  series: [
    {
      name: "word",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["40%", "50%"],
      data: data.seriesData,
      label: {
        show: false,
        position: "center",
      },
      labelLine: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          fontWeight: "bold",
        },
      },
    },
  ],
});

export const wordcloudOps = (data) => ({
  series: [
    {
      type: "wordCloud",
      shape: "circle",
      rotationStep: 10,
      textStyle: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        // Color can be a callback function or a color string
        color: function () {
          // Random color
          return (
            "rgb(" +
            [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
            ].join(",") +
            ")"
          );
        },
      },
      emphasis: {
        focus: "self",

        textStyle: {
          shadowBlur: 10,
          shadowColor: "#333",
        },
      },
      data,
    },
  ],
});

export const treeOps = (data) => ({
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
  },
  series: [
    {
      type: "tree",
      data: [data],
      top: "18%",
      bottom: "14%",
      layout: "radial",
      symbol: "emptyCircle",
      symbolSize: 7,
      initialTreeDepth: 3,
      animationDurationUpdate: 750,
      emphasis: {
        focus: "descendant",
      },
    },
  ],
});

export const streamOps = (data) => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "rgba(0,0,0,0.2)",
        width: 1,
        type: "solid",
      },
    },
  },
  legend: {
    data: ["Angry", "Fear", "Happy", "Sad", "Surprise"],
  },
  singleAxis: {
    top: 50,
    bottom: 50,
    axisTick: {},
    axisLabel: {},
    axisPointer: {
      animation: true,
      label: {
        show: true,
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        opacity: 0.2,
      },
    },
  },
  series: [
    {
      type: "themeRiver",
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: "rgba(0, 0, 0, 0.8)",
        },
      },
      data,
    },
  ],
});

export const mapOps = (data, k) => {
  var COLOR_ALL = [
    "#37A2DA",
    "#e06343",
    "#37a354",
    "#b55dba",
    "#b5bd48",
    "#8378EA",
    "#96BFFF",
  ];
  var pieces = [];
  for (var i = 0; i < k; i++) {
    pieces.push({
      value: i,
      label: "cluster " + i,
      color: COLOR_ALL[i],
    });
  }
  return {
    dataset: [
      {
        source: data,
      },
      {
        transform: {
          type: "ecStat:clustering",
          // print: true,
          config: {
            clusterCount: k,
            outputType: "single",
            outputClusterIndexDimension: 2,
          },
        },
      },
    ],
    tooltip: {
      position: "top",
    },
    visualMap: {
      type: "piecewise",
      top: "middle",
      min: 0,
      max: k,
      left: 10,
      splitNumber: k,
      dimension: 2,
      pieces: pieces,
    },
    grid: {
      left: 120,
    },
    xAxis: {},
    yAxis: {},
    series: {
      type: "scatter",
      encode: { tooltip: [0, 1] },
      symbolSize: 15,
      itemStyle: {
        borderColor: "#555",
      },
      datasetIndex: 1,
    },
  };
};

export const radarOps = (data) => ({
  tooltip: {
    trigger: "axis",
  },
  radar: [
    {
      indicator: [
        { name: "Angry", max: 1 },
        { name: "Fear", max: 1 },
        { name: "Happy", max: 1 },
        { name: "Sad", max: 1 },
        { name: "Surprise", max: 1 },
      ],
    },
  ],
  series: [
    {
      type: "radar",
      tooltip: {
        trigger: "item",
      },
      areaStyle: {},
      data: [
        {
          value: data,
          name: "Emotion",
        },
      ],
    },
  ],
});
