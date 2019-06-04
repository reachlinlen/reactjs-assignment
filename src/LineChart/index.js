import React, { useState, useEffect } from 'react';

const SVG_WTH = '50vw', SVG_HT = '50vh';
var d3 = require("d3");
export default function LineChart(props) {
  useEffect(() => {
    d3.selectAll("tran-line-chart").remove();
    let svg = d3.select("line-chart")
                  .append("g")
                  .attr("id", "tran-line-chart");
  });
  return (
    <svg width={SVG_WTH} height={SVG_HT} id={"line-chart"} />
  );
}