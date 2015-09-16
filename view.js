var TETRIS = TETRIS || {};


TETRIS.View = (function() {

  var $board;


  function init() {
    $board = $('.board');
  }


  function render(rows) {
    drawBoard(rows);
  };


  function drawBoard(rows) {
    rows.forEach(drawRow);
    /*for(var i = 0; i < width * height; i++) {
      $unit = $("<div class='unit'></div>");
      $unit.appendTo($board);
    }*/
  };


  function drawRow(row, index) {
    var $row = $("<div class='row'></div>");
    $row.appendTo($board);
    row.forEach(drawUnit);
  };


  function drawUnit(unit, index) {
    var $lastRow = $board.children().last();
    var $unit = $("<div class='unit'></div>");
    $unit.appendTo($lastRow);
  };


  return {
    init: init,
    render: render
  };

})();