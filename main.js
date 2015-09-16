var TETRIS = TETRIS || {};


TETRIS.MainModule = (function() {

  function init() {
    TETRIS.Board.init();
    TETRIS.View.init();
    var rows = TETRIS.Board.getRows();
    TETRIS.View.render(rows);
  };


  return {
    init: init
  };

})();