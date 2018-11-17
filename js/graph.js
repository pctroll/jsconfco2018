
let jsonGraph = {
  nodes: [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 0, y: 1},
    {x: 2, y: 1},
    {x: 0, y: 2},
    {x: 2, y: 2},
    {x: 0, y: 3},
    {x: 1, y: 3},
    {x: 2, y: 3},
    {x: 3, y: 3}
  ],
  neighbors: [
    [1, 4],
    [0, 2],
    [1, 3, 5],
    [2],
    [0, 6],
    [2, 7],
    [4, 8],
    [5, 10],
    [6, 9],
    [8, 10],
    [9, 7, 11],
    [10]
  ]
};

let Graph = function() {
  this.nodes;
  this.neighbors;
  // for grid graphs only
  this.offsetX;
  this.offsetY;
};




