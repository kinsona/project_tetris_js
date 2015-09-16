var TETRIS = TETRIS || {};


TETRIS.Board = (function() {

  var width,
      height,
      rows;

  // row look like [,,,,,]
  // board look like [row,row,row,row]
  // 0,0 is top-left

  function init() {
    width = 10;
    height = 24;
    rows = _buildRows();
  };


  function _buildRows() {
    var tempRows = []

    for (var i = 0; i < height; i++) {
      tempRows.push(_buildSingleRow(i));
    };

    return tempRows;
  };


  function _buildSingleRow(rowNumber) {
    var row = [];

    for (var colNumber = 0; colNumber < width; colNumber++) {
      var newUnit = new GridUnit(rowNumber, colNumber);
      row.push(newUnit);
    };

    return row;
  };


  function GridUnit(row, col) {
    this.row = row;
    this.col = col;
  };




  return {
    init: init,
    getHeight: function() { return height },
    getWidth: function() { return width },
    getRows: function() { return rows }
  };

})();