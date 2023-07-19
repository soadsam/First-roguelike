var game = {
  display: null,
  map: {},
  player: null,

  init: function () {
    this.display = new ROT.Display();
    this.displayConsole = new ROT.Display({ height: 7 });

    let display = this.display;
    display.setOptions({
      width: 100,
      height: 50,
      fontSize: 20,
      forceSquareRatio: true,
    });

    let displayConsole = this.displayConsole;
    displayConsole.setOptions({
      width: 100,
      fontSize: 20,
      forceSquareRatio: true,
    });

    document.body.appendChild(this.display.getContainer());
    document.body.appendChild(this.displayConsole.getContainer());
    this._generateMap();
    this.displayConsole.drawText(1, 3, "Fuck off");
    console.log(this.map);
  },

  _generateMap: function () {
    let digger = new ROT.Map.Digger(100, 50);
    freeCells = [];

    let digCallback = function (x, y, value) {
      if (value) {
        return;
      } /* do not store walls */

      let key = x + "," + y;
      this.map[key] = ".";
      freeCells.push(key)
      //   console.log(this)
    };

    digger.create(digCallback.bind(this));
    this._generateBoxes();

    this._drawWholeMap();
    this._createPlayer(freeCells);
  },



  _createPlayer: function (freeCells) {
    let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    console.log(freeCells.length)
    let key = freeCells.splice(index, 1)[0];
    let parts = key.split(",");
    let x = parseInt(parts[0]);
    let y = parseInt(parts[1]);
    this.player = new Player(x, y);
  },

  _generateBoxes: function () {
    for (let i = 0; i < 10; i++) {
      let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      let key = freeCells.splice(index, 1)[0];
      this.map[key] = "O";
    }
  },
  
  _drawWholeMap: function () {
    for (let key in this.map) {
      let parts = key.split(",");
      let x = parseInt(parts[0]);
      let y = parseInt(parts[1]);
      this.display.draw(x, y, this.map[key]);
    }
  },
};

var Player = function (x, y) {
  this._x = x;
  this._y = y;
  this._draw();
};

Player.prototype._draw = function () {
  game.display.draw(this._x, this._y, "@", "#ff0");
};

//   let map = ROT.Map.Arena(3, 3),
//   let userCallback = function (x, y, value) {
//     SHOW(ROT.Util.format("Value %s generated at [%s,%s]", value, x, y));
//     map.create(userCallback);
//   },
