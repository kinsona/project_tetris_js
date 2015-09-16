var TETRIS = TETRIS || {};


TETRIS.Board = (function() {

  var _width,
      _height,
      _rows;

  // row look like [,,,,,]
  // board look like [row,row,row,row]
  // 0,0 is top-left

  function init() {
    _width = 10;
    _height = 20;
    _rows = _buildRows();
  };


  function _buildRows() {
    var tempRows = []

    for (var i = 0; i < _height; i++) {
      tempRows.push(_buildSingleRow(i));
    };

    return tempRows;
  };


  function _buildSingleRow(rowNumber) {
    var row = [];

    for (var colNumber = 0; colNumber < _width; colNumber++) {
      var newUnit = new GridUnit(rowNumber, colNumber);
      row.push(newUnit);
    };

    return row;
  };


  function GridUnit(row, col) {
    this.row = row;
    this.col = col;
  };


  function getRows() {
    return _rows;
  };


  return {
    init: init,
    getRows: getRows
  };

})();