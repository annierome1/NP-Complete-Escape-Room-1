function drawMap(game) {
    const mapContainer = document.getElementById("game-map");
    mapContainer.innerHTML = ""; // Clear previous map
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "400");
    mapContainer.appendChild(svg);
  
    // Layout parameters
    const centerX = 200, centerY = 200, radius = 150;
    const roomPositions = {};
    const numRooms = game.graph.numRooms;
  
    // Calculate positions for each room in a circle
    for (let i = 0; i < numRooms; i++) {
      let angle = (2 * Math.PI * i) / numRooms;
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      roomPositions[i] = { x, y };
  
      // Draw the room as a circle
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", 15);
      // Highlight the current room
      circle.setAttribute("fill", game.currentRoom === i ? "red" : "blue");
      svg.appendChild(circle);
  
      // Add room label
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x - 5);
      text.setAttribute("y", y + 5);
      text.textContent = i;
      svg.appendChild(text);
    }
  
    // Draw edges between rooms
    for (let room in game.graph.edges) {
      let fromPos = roomPositions[room];
      game.graph.edges[room].forEach(neighbor => {
        // To avoid duplicate lines, only draw if neighbor > room
        if (parseInt(neighbor) > parseInt(room)) {
          let toPos = roomPositions[neighbor];
          const line = document.createElementNS(svgNS, "line");
          line.setAttribute("x1", fromPos.x);
          line.setAttribute("y1", fromPos.y);
          line.setAttribute("x2", toPos.x);
          line.setAttribute("y2", toPos.y);
          line.setAttribute("stroke", "black");
          svg.appendChild(line);
        }
      });
    }
  }
  