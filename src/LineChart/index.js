import React, { useState, useEffect } from 'react';

const SVG_WTH = 720, SVG_HT = 410, LEG_COLORS = ["red", "green", "blue"];
var d3 = require("d3");
export default function LineChart(props) {
  useEffect(() => {
    d3.selectAll("tran-line-chart").remove();
    let data = [
      ["transID01", "USER - A", "American Express", 2500],
      ["transID02", "USER - B", "American Express", 2500],
      ["transID03", "USER - C", "American Express", 1500],
      ["transID13", "USER - C", "American Express",  500],
      ["transID04", "USER - A", "DBS", 2500],
      ["transID05", "USER - B", "DBS", 1500],
      ["transID06", "USER - C", "DBS", 500],
      ["transID07", "USER - A", "VISA", 2500],
      ["transID07", "USER - B", "VISA", 1500],
      ["transID07", "USER - C", "VISA", 500],
    ];
    let finalData = {}, cards = [], maxAmt = 0, maxTran = 0;
    data.forEach(d => {
      let ind = cards.indexOf(d[2]);
      maxAmt = Math.max(maxAmt, d[3]);
      if (ind === -1) {
        cards.push(d[2]);
        ind = cards.indexOf(d[2]);
        finalData[ind] = {};
      }
      finalData[ind][d[3]] = finalData[ind][d[3]] === undefined ?
                                        1 : finalData[ind][d[3]] + 1;
    });
    Object.entries(finalData).forEach(([key, value]) => {
      Object.entries(value).forEach(([key, val]) => {
        maxTran = Math.max(maxTran, val);
      });
    });
    let svg = d3.select("#line-chart")
                  .append("g")
                  .attr("id", "tran-line-chart");
        // svg.selectAll
        svg.selectAll("legend-rect")
                  .data(cards)
                  .enter().append("rect")
                  .attr("x", (d,i) => (200 + i*100))
                  .attr("y", 10)
                  .attr("width", 1.5+"vw")
                  .attr("height", 1.5+"vh")
                  .attr("fill", (d,i) => LEG_COLORS[i]);
        svg.selectAll("legend-text")
                  .data(cards)
                  .enter().append("text")
                  .text(d => d)
                  .attr("x", (d,i) => (230 + i*100))
                  .attr("y", 20)
                  .attr("width", 1.5+"vw")
                  .attr("height", 1.5+"vh")
                  .attr("stroke", "#000");
    let scaleLeft = d3.scaleLinear().domain([maxAmt, 0]).range([0,0.8*SVG_HT]);
    let leftAxis = d3.axisLeft(scaleLeft).ticks(8);
        svg.append("g")
            .attr("transform", "translate(80,50)")
            .call(leftAxis);
    let scaleBot = d3.scaleLinear().domain([0, maxTran]).range([0,0.8*SVG_WTH]);
    let botAxis = d3.axisBottom(scaleBot).ticks(8);
        svg.append("g")
            .attr("transform", "translate(80, 370)")
            .call(botAxis);
    let points = [];
    Object.entries(finalData).forEach(([key, value]) => {
      let axisPts = [];
      Object.entries(value).forEach(([k,v]) => {
        const x = scaleBot(v);
        const y = scaleLeft(k);
        axisPts.push({"x": x,"y": y});
      });
      points.push(axisPts);
    });
    let lineFunc = d3.line()
                      .x(d => d.x)
                      .y(d => d.y)
                      .curve(d3.curveMonotoneX);
    svg.append("path")
        .attr("d", lineFunc(points[0]))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");
    // points.forEach(p => {
    //   for(let i=0;i < (p.length-2);i++) {
    //     for(let j=i;j < (p.length-1);j++) {
    //       if (p[j][0] > p[j+1][0]) {
    //         let a = p[j][0];
    //         p[j][0] = p[j+1][0];
    //         p[j+1][0] = a;
    //       }
    //     }
    //   }
    // });
  });

  return (
    <div className="svg-line" style={{margin: '2vh 0 0 15vw', height: '50vh', width: '50vw', backgroundColor: '#b6b9ba'}}>
      <svg width={'100%'} height={'100%'} id={"line-chart"} />
    </div>
  );
}