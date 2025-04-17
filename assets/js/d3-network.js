const width = window.innerWidth * 0.95;
const height = window.innerHeight * 0.85;

const svg = d3.select("svg")
  .attr("viewBox", [0, 0, width, height])
  .call(d3.zoom().on("zoom", function (event) {
    g.attr("transform", event.transform);
  }));

const g = svg.append("g");

// 🎲 Generate random bipartite graph with multi-edges
const numLeft = 10;
const numRight = 8;
const numEdges = 40;

const leftNodes = Array.from({ length: numLeft }, (_, i) => ({
  id: `L${i + 1}`,
  group: "Left"
}));

const rightNodes = Array.from({ length: numRight }, (_, i) => ({
  id: `R${i + 1}`,
  group: "Right"
}));

const nodes = [...leftNodes, ...rightNodes];

// Count edges to simulate multi-edges
const edgeMap = new Map();

for (let i = 0; i < numEdges; i++) {
  const source = leftNodes[Math.floor(Math.random() * leftNodes.length)].id;
  const target = rightNodes[Math.floor(Math.random() * rightNodes.length)].id;
  const key = `${source}--${target}`;
  edgeMap.set(key, (edgeMap.get(key) || 0) + 1);
}

const links = Array.from(edgeMap.entries()).map(([key, count]) => {
  const [source, target] = key.split("--");
  return { source, target, count };
});

// 🎨 Colors
const color = d3.scaleOrdinal()
  .domain(["Left", "Right"])
  .range(["#1f77b4", "#ff7f0e"]);

const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background", "#fff")
  .style("border", "1px solid #999")
  .style("padding", "5px 10px")
  .style("border-radius", "5px")
  .style("pointer-events", "none")
  .style("opacity", 0);

// ⚖️ Static x-positions for bipartite layout
nodes.forEach((d, i) => {
  d.x = d.group === "Left" ? width * 0.2 : width * 0.8;
  d.y = height / (nodes.length + 1) * (i + 1);
});

// 🧠 Simulation
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(120).strength(1))
  .force("collision", d3.forceCollide(25))
  .force("y", d3.forceY(height / 2).strength(0.1))
  .force("x", d3.forceX(d => d.group === "Left" ? width * 0.2 : width * 0.8).strength(0.2))
  .alphaDecay(0.03);

// 🔗 Edges
const link = g.append("g")
  .attr("stroke", "#aaa")
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-width", d => 1 + d.count * 1.2)
  .attr("stroke-opacity", 0.7);

// 🟠 Nodes
const node = g.append("g")
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 10)
  .attr("fill", d => color(d.group))
  .call(drag(simulation))
  .on("mouseover", (event, d) => {
    tooltip.transition().duration(200).style("opacity", 1);
    tooltip.html(`<strong>${d.id}</strong><br/>Group: ${d.group}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", () => {
    tooltip.transition().duration(300).style("opacity", 0);
  });

// 🏷 Labels
const labels = g.append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text(d => d.id)
  .attr("font-size", 12)
  .attr("text-anchor", "middle")
  .attr("dy", -15)
  .attr("pointer-events", "none");

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  labels
    .attr("x", d => d.x)
    .attr("y", d => d.y);
});

// 🖱 Drag support
function drag(simulation) {
  return d3.drag()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}