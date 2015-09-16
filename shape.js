var TETRIS = TETRIS || {};

TETRIS.ShapeModule = (function() {

  var _shape4x1 =  [
                    {low: 0, high: 10},
                    {row: 3, col: 0},
                    {row: 2, col: 0},
                    {row: 1, col: 0},
                    {row: 0, col: 0}
                  ];


  var _shape2x2 = [
                    {low: 0, high: 9},
                    {row: 3, col: 0},
                    {row: 3, col: 1},
                    {row: 2, col: 0},
                    {row: 2, col: 1}
                  ];

  var _shapeLeftL = [
                      {low: 0, high: 9},
                      {row: 3, col: 0},
                      {row: 3, col: 1},
                      {row: 2, col: 0},
                      {row: 1, col: 0}
                    ];

  var _shapeRightL =  [
                        {low: 1, high: 10},
                        {row: 3, col: 0},
                        {row: 3, col: 1},
                        {row: 2, col: 1},
                        {row: 1, col: 1}
                      ];

  var _shapeLeftS = [
                      {low: 0, high: 8},
                      {row: 3, col: 0},
                      {row: 3, col: 1},
                      {row: 2, col: 1},
                      {row: 2, col: 2}
                    ];

  var _shapeRightS =  [
                        {low: 1, high: 8},
                        {row: 3, col: 1},
                        {row: 3, col: 2},
                        {row: 2, col: 0},
                        {row: 2, col: 1}
                      ];


  var _shapes = [_shape4x1, _shape2x2, _shapeLeftL, _shapeRightL, _shapeLeftS, _shapeRightS];

  function getShapeOffsets() {
    return _shapes[Math.floor( Math.random() * _shapes.length)];
  };

  return {
    getShapeOffsets: getShapeOffsets
  }


})();
/*

*/