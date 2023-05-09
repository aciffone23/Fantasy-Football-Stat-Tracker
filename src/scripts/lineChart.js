
//dimensions and margins for chart
export function lineChart(data, topPlayerData) {
    // console.log("Top Player Data:", topPlayerData);
    const margin = { top: 70, right: 30, bottom: 40, left: 100 };
    const width = 450 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;
  
    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain(d3.extent(data, (d) => {
        console.log(d.week,d.value);
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
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", topPlayerLine); 
  
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    svg.append("g").call(d3.axisLeft(y));
  }

