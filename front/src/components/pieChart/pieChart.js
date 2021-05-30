import React, { useEffect, useRef } from "react";
import "./pieChart.scss";
import * as d3 from "d3";
import {FormattedMessage} from "react-intl"


export const Pie = (props) => {
  const grafico = useRef();

  useEffect(() => {
    d3.select(grafico.current).selectAll("*").remove();
    const svg = d3.select(grafico.current),
      width = svg.attr("width"),
      height = svg.attr("height"),
      radius = Math.min(width, height) / 2;
    let habitaciones = props.rooms ? props.rooms : [];
    var colors = d3.scaleOrdinal(d3.schemeSet2);

    d3.select("body").selectAll("div.tooltip").remove();
    var tool = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var data = d3.pie().value(function (b) {
      return b.powerUsage.value;
    })(habitaciones);

    var segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.2)
      .padRadius(1);
    var sections = svg
      .append("g")
      .attr("transform", "translate(250,250)")
      .selectAll("path")
      .data(data);

    sections
      .enter()
      .append("path")
      .attr("d", segments)
      .attr("fill", function (d) {
        return colors(d.data._id);
      })
      .on("mouseover", function (event, d) {
        tool.transition().duration(200).style("opacity", 0.9);
        tool
          .html("<strong>" + d.data.name + ":</strong>  " + d.data.powerUsage.value+d.data.powerUsage.unit)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mousemove", function (event, d) {
        tool
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function (event, d) {
        tool.transition().duration(500).style("opacity", 0);
      });
  });

  return <svg height="500" width="700" ref={grafico}></svg>;
};
