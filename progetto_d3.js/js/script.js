function  rearrange(data) {
    result = []
    data.forEach(row => {result.push([row[1],row[2],row[3],row[0],row[4]])})
    return result;
}

function handleClick() {
    dataSet = rearrange(dataSet);

    xScale.domain([0, d3.max(dataSet, function(d) { return d[0]; }) +d3.max(dataSet, function(d) { return d[2]; })]);

    yScale.domain([0, d3.max(dataSet, function(d) { return d[1]; }) +d3.max(dataSet, function(d) { return d[3]; })]);

    svg.selectAll("rect")
        .data(dataSet)
        .transition().duration(updateTime)
        .attr("x", function(d) { return xScale(d[0]);})
        .attr("y", function(d) { return yScale(d[1]);})
        .attr("width", function(d) { return xScale(d[2]);})
        .attr("height", function(d) { return yScale(d[3]);})
        .attr("fill", function(d){  return d[4] })
        .attr("stroke-width", "2")
        .attr("stroke", "black");

    svg.select(".y.axis").transition().duration(updateTime).call(yAxis);

    svg.select(".x.axis").transition().duration(updateTime).call(xAxis);

};
var margin = {top: 10, right: 30, bottom: 50, left: 60};

var width = 1000 - margin.left - margin.right;

var height = 600 - margin.top - margin.bottom;

var yScale = d3.scaleLinear().range([0, height]);

var xScale = d3.scaleLinear().range([0, width]);

var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var updateTime = 600;

var dataSet= [];

 d3.json("data/dataset.json").then(function(data){
    data.forEach(row => {
        arr = Object.getOwnPropertyNames(row).map(function(e) {return row[e];});
        dataSet.push(arr);
    });

     xScale.domain([0, d3.max(dataSet, function(d) { return d[0]; }) +d3.max(dataSet, function(d) { return d[2]; })]);

     yScale.domain([0, d3.max(dataSet, function(d) { return d[1]; }) +d3.max(dataSet, function(d) { return d[3]; })]);

     svg.select(".y.axis").transition().duration(updateTime).call(yAxis);

     svg.select(".x.axis").transition().duration(updateTime).call(xAxis);

     svg.append("g")
         .selectAll("rect")
         .data(dataSet)
         .enter()
         .append("rect")
         .attr("x", function(d) { return xScale(d[0]) })
         .attr("y", function(d) { return yScale(d[1])})
         .attr("width", function(d) { return xScale(d[2]) })
         .attr("height", function(d) { return yScale(d[3]) })
         .attr("fill", function(d){  return d[4] })
         .attr("stroke-width", "2")
         .attr("stroke", "black");

     d3.select("svg").on("click", handleClick);
 });



