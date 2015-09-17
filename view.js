var TETRIS = TETRIS || {};


TETRIS.View = (function() {

  var $board;
  var $score;


  function init() {
    $board = $('.board');
    $score = $('.header p');
    $('#start').on('click', TETRIS.MainModule.start );
  }


  function drawBoard(rows) {
    rows.slice(4,24).forEach(_drawRow);
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


  function render(pieces, score) {
    if (pieces.length > 0) {
      _drawPieces(pieces)
    };
    $score.text('Score: ' + score);
  };


  function _drawPieces(pieces) {
    $board.children().children().removeClass('piece active clearing');
    pieces.forEach(_drawSinglePiece);
  };


  function _drawSinglePiece(piece, index) {
    if (piece.row > 3) {
      $piece = $board.children().eq(piece.row - 4).children().eq(piece.col);
      $piece.addClass('piece');
      if (piece.active) {
        $piece.addClass('active');
      };
      if (piece.clearing) {
        $piece.addClass('clearing');
      };
    };
  };


  function enableControls() {
    $(window).on('keydown', TETRIS.MainModule.keydown);
  };


  function disableControls() {
    $(window).off('keydown');
  }


  return {
    init: init,
    drawBoard: drawBoard,
    render: render,
    enableControls: enableControls,
    disableControls: disableControls
  };

})();