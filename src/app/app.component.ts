import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

import { STATISTICS } from './shared/data';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}} <span class="timer">{{ticks}}</span> </h1>
    <h2>{{subtitle}}</h2>
    <svg width="640" height="480"></svg>
  `
})
export class AppComponent implements OnInit {

  title = 'D3 v4 with Angular 4!';
  ticks = 0
  subtitle = 'This chart should update automatically every 5 second.'


  private width: number;
  private height: number;
  private margin = {top: 20, right: 30, bottom: 40, left: 30};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private tickNegative: any;
  private tickPositive: any;

  constructor() {}

  ngOnInit() {
    let timer = Observable.timer(2000,5000);
    let setTimer = Observable.timer(2000,1000);
    setTimer.subscribe(t => this.timeFunk(t))
    timer.subscribe(t => this.tickerFunc(t));
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  timeFunk(t) {
      this.ticks = t
  }

  tickerFunc(t){
    d3.selectAll("svg > *").remove();
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
  }


  private initSvg() {
    d3.selectAll("svg > *").remove();
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right ;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
                    .attr('width', this.width + this.margin.left + this.margin.right)
                    .attr('height', this.height + this.margin.top + this.margin.bottom)
                     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
  }

  private initAxis() {
    STATISTICS.sort(function(a, b) {
            return a.frequency - b.frequency;
          });
    this.x = d3Scale.scaleLinear().rangeRound([10, this.width]);
    this.y = d3Scale.scaleBand().rangeRound([ this.height, 1]).padding(0.1);
    this.x.domain([-130, 130])
    this.y.domain(STATISTICS.map((d) => d.letter ));
  }

  private drawAxis() {
    // this.g.append("g")
    //       .attr("class", "x axis")
    //       .attr("transform", "translate(19," + this.height +  ")")
    //       .call(
    //         d3Axis.axisBottom(this.x)
    //       );

   this.tickNegative = this.g.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + this.x(17) + ",0)")
          .call(d3Axis.axisLeft(this.y))
          .filter((d, i) => STATISTICS[i].frequency < 0);
  }

  private drawBars() {
    this.g.selectAll(".bar")
          .data(STATISTICS)
          .enter().append("rect")
          .attr("class", (d) => "bar bar--" + (d.frequency < 0 ? "negative" : "positive"))
          .attr("x", (d) => this.x(Math.min(17, d.frequency)) )
          .attr("y", (d) => this.y(d.letter) )
          .attr("width", (d) => Math.abs(this.x(d.frequency) - this.x(0)) )
          .attr("height", 34)
  }

  private type(d){
    d.frequency = +d.frequency;
    return d;
  }

}
