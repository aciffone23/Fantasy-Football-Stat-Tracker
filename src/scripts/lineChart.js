
//dimensions and margins for chart
export function lineChart(data, topPlayerData) {

    const margin = { top: 70, right: 30, bottom: 40, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 550 - margin.top - margin.bottom;
  
    const x = d3
        .scaleLinear()
        .range([0, width])
        .domain(d3.extent(data, (d) => {
            return d.week;
    }));

    const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, 55]);
  
    const svg = d3
        .select("#line-chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
     const line = d3
        .line()
        .x((d) => x(d.week))
        .y((d) => y(d.value));
    
    svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", line);

    const topPlayerLine = d3
        .line()
        .x((d) => x(d.week))
        .y((d) => y(d.value));    

    svg
        .append("path")
        .datum(topPlayerData)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", topPlayerLine); 

    svg
        .append("text")
        .attr("transform", `translate(${width / 2},${height + margin.bottom - 5})`)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Week");
        
    const circles = svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', 'red')
        .attr('stroke', 'none')
        .attr('cx', function(d) { return x(d.week) })
        .attr('cy', function(d) { return y(d.value) })
        .attr('r', 5);
    
    const topPlayerCircles = svg
        .selectAll('.topPlayerCircle')
        .data(topPlayerData)
        .enter()
        .append('circle')
        .attr('class', 'topPlayerCircle')
        .attr('fill', 'black')
        .attr('stroke', 'none')
        .attr('cx', function(d) { return x(d.week) })
        .attr('cy', function(d) { return y(d.value) })
        .attr('r', 5);

    svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Fantasy Points");

    
    const tooltip = d3.select('#line-chart-container')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    circles.on('mouseover', (event, d) => {
        let [x, y] = d3.pointer(event);
        tooltip.transition()
            .duration(200)
            .style('opacity', 1.4);
        tooltip.html(`Week: ${d.week}<br/>Pts: ${d.value}`)
            .style('left', `${x + margin.left}px`)
            .style('top', `${y + margin.top + 100}px`);
    });

    circles.on('mouseout', (d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    });

    topPlayerCircles.on('mouseover', (event, d) => {
        let [x, y] = d3.pointer(event);
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);
        tooltip.html(`Week: ${d.week}<br/>Pts: ${d.value}`)
            .style('left', `${x + margin.left}px`)
            .style('top', `${y + margin.top + 100}px`); // 5 is the circle radius
    });

    topPlayerCircles.on('mouseout', (d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    });

    svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
  
    svg.append("g").call(d3.axisLeft(y));
  }

