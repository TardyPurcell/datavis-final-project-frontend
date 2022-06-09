const pieOps = (data) => ({
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

export default pieOps;
