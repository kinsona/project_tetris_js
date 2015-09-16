var TETRIS = TETRIS || {};


TETRIS.View = (function() {

  var $board;


  function init() {
    $board = $('.board');
    $('#start').on('click', TETRIS.MainModule.start );
  }


  function drawBoard(rows) {
    rows.forEach(_drawRow);
  };


  function _drawRow(row, index) {
    var $row = $("<div class='row'></div>");
    $row.appendTo($board);
    row.forEach(_drawUnit);
  };


  function _drawUnit(unit, index) {
    var $lastRow = $board.children().last();
    var $unit = $("<div class='unit'></div>");
    $unit.appendTo($lastRow);
  };


  function render(pieces) {

    if (pieces.length > 0) {
      _drawPieces(pieces)
    };
  };


  function _drawPieces(pieces) {
    $board.children().children().removeClass('piece active');
    pieces.forEach(_drawSinglePiece);
  };


  function _drawSinglePiece(piece, index) {
    $piece = $board.children().eq(piece.row).children().eq(piece.col);
    $piece.addClass('piece');
    if (piece.active) {
      $piece.addClass('active');
    };
  }


  return {
    init: init,
    drawBoard: drawBoard,
    render: render
  };

})();