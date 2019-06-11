import React, { useState, useEffect } from 'react';

const SVG_WTH = 720, SVG_HT = 403, LEG_COLORS = ["red", "green", "blue"];
var d3 = require("d3");
export default function LineChart(props) {
  useEffect(() => {
    d3.selectAll("tran-line-chart").remove();
    let data = [
      ["transID01", "USER - A", "American Express", 2500],
      ["transID02", "USER - B", "American Express", 2500],
      ["transID03", "USER - C", "American Express", 1750],
      ["transID13", "USER - C", "American Express",  750],
      ["transID04", "USER - A", "DBS", 2500],
      ["transID05", "USER - B", "DBS", 1500],
      ["transID06", "USER - C", "DBS", 500],
      ["transID07", "USER - A", "VISA", 2500],
      ["transID07", "USER - B", "VISA", 1250],
      ["transID07", "USER - C", "VISA", 250],
    ];
    let finalData = {}, cards = [], maxAmt = 0, maxTran = 0, txnNos = new Set();
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
        txnNos.add(val);
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
    cards.forEach((card, index) => {
      if (card.length > 8) {
        svg.selectAll("legend-text")
            .data([card])
            .enter().append("text")
            .text(d => d.slice(0,9))
            .attr("x", d => (230 + index*100))
            .attr("y", 20)
            .attr("width", 1.5+"vw")
            .attr("height", 1.5+"vh")
            .attr("stroke", "#000");
        svg.selectAll("legend-text")
            .data([card])
            .enter().append("text")
            .text(d => d.slice(9))
            .attr("x", d => (230 + index*100))
            .attr("y", 40)
            .attr("width", 1.5+"vw")
            .attr("height", 1.5+"vh")
            .attr("stroke", "#000");
      }
      else {
        svg.selectAll("legend-text")
            .data([card])
            .enter().append("text")
            .text(d => d)
            .attr("x", (d,i) => (230 + index*100))
            .attr("y", 20)
            .attr("width", 1.5+"vw")
            .attr("height", 1.5+"vh")
            .attr("stroke", "#000");
      }
    });
    let scaleLeft = d3.scaleLinear().domain([0, maxAmt]).range([0.8*SVG_HT,0]);
    let leftAxis = d3.axisLeft(scaleLeft).ticks(8);
        svg.append("g")
            .attr("transform", "translate(80,50)")
            .call(leftAxis);
    let scaleBot = d3.scaleLinear().domain([0, maxTran]).range([0,0.8*SVG_WTH]);
    let botAxis;
    if (txnNos.size > 8) botAxis = d3.axisBottom(scaleBot).ticks(8);
    else {
      let tickVal = [];
      let iterator = txnNos.values();
      let val = iterator.next().value;
      while (val !== undefined) {
        tickVal.push(val);
        val = iterator.next().value;
      }
      botAxis = d3.axisBottom(scaleBot).tickValues(tickVal);
    }
    // let botAxis = d3.axisBottom(scaleBot).ticks(8);
        svg.append("g")
            .attr("transform", "translate(80, 373)")
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
    let a;
    points.forEach(p => {
      for(let i=0;i < p.length-1;i++) {
        for(let j=i+1;j < p.length;j++) {
          if (p[i]['x'] > p[j]['x']) {
            a = p[i];
            p[i] = p[j];
            p[j] = a;
          }
          if (p[i]['x'] === p[j]['x'] && p[i]['y'] < p[j]['y']) {
            a = p[i];
            p[i] = p[j];
            p[j] = a;
          }
        }
      }
    });
    let lineFunc = d3.line()
                      .x(d => d.x+80)
                      .y(d => d.y+50)
                      .curve(d3.curveMonotoneX);
    points.forEach((p,ind) => {
      svg.append("path")
        .attr("class","line-"+ind)
        .attr("d", lineFunc(p))
        .attr("stroke", LEG_COLORS[ind])
        .attr("stroke-width", 2)
        .attr("fill", "none");
    })
  });

  return (
    <div className="svg-line" style={{height: SVG_HT, width: SVG_WTH, backgroundColor: '#b6b9ba', marginTop: '20px'}}>
      <svg width={SVG_WTH} height={SVG_HT} id={"line-chart"} />
    </div>
  );
}