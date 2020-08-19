<template>
  <div class="Pie-chart" id="pie-chart-container">
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import * as d3 from 'd3';

export default {
    props: {
      data: {
        type: Array
      }
    },
    mounted() {
      this.createPieChart();
    },
    methods: {
      createPieChart() {
        // Set the dimensions and margins of the graph
        let width = 450;
        let height = 450;
        let margin = 40;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin

        // Append the svg object to the div called 'pie-chart-container'
        var svg = d3.select("#pie-chart-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          // Get data
          var data = this.createPieChartData();

          // Set the color scale
          var color = d3.scaleOrdinal()
            .domain(data)
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

          // Compute the position of each group on the pie:
          var pie = d3.pie()
            .value(function(d) {return d.value; })

          var data_ready = pie(d3.entries(data))

          // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
          svg.selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
              .innerRadius(0)
              .outerRadius(radius)
            )
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
      },
      // Todo: Move to parent. The compnent should receive already prepared data:
      createPieChartData() {
        let groupedByStatus = this.data.reduce(function (obj, garment) {
          // Get the status
          let status = garment['status'];
          // If the length doesn't already exist as a key in the object, create it
          if (!obj.hasOwnProperty(status)) {
            obj[status] = [];
          }
          // Push the number to its integer key
          obj[status].push(garment);
          // Pass the object on to the next loop
          return obj;
        }, {});
        let statusCount = [];
        for (const [key, value] of Object.entries(groupedByStatus)) {
          statusCount[key] = value.length;
        }
        return statusCount;
      }
    }
}
</script>

<style>

.Pie-chart {
  width: 500px;
  height: 500px;
}

</style>
