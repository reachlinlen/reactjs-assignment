import React, { useState, useEffect } from 'react';

const SVG_WTH = '50vw', SVG_HT = '50vh';
var d3 = require("d3");
export default function LineChart(props) {
  useEffect(() => {
    d3.selectAll("tran-line-chart").remove();
    let data = [
      ["transID01", "USER - A", "American Express", 500],
      ["transID02", "USER - B", "American Express", 1500],
      ["transID03", "USER - C", "American Express", 2500],
      ["transID04", "USER - A", "DBS", 500],
      ["transID05", "USER - B", "DBS", 1500],
      ["transID06", "USER - C", "DBS", 2500],
      ["transID07", "USER - A", "VISA", 500],
      ["transID07", "USER - B", "VISA", 1500],
      ["transID07", "USER - C", "VISA", 2500],
    ];
    let finalData = {}, cards = [];
    data.forEach(d => {
      let ind = cards.indexOf(d[2]);
      if (ind === -1) {
        cards.push(d[2]);
        ind = cards.indexOf(d[2]);
      }
      finalData[ind][d[3]] += 1;
    });
    let svg = d3.select("line-chart")
                  .append("g")
                  .attr("id", "tran-line-chart");
    this.drawLegends(svg);
  });

  drawLegends = (svg, cards) => {
    
    svg.selectAll("legend-rect")
        .data(cards)
        .enter().append("rect")
        .attr("x", 0.6*SVG_WTH)
        .attr("y", 0.1*SVG_HT)
        .attr("width", 0.05*SVG_HT)
        .attr("height", 0.05*SVG_HT)
        .style("fill", "#000");
  }

  return (
    <svg width={SVG_WTH} height={SVG_HT} id={"line-chart"} />
  );
}