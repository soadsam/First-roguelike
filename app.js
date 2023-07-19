var game = {
  display: null,
  map: {},

  init: function () {
    this.display = new ROT.Display();
    this.console = new ROT.Display({height: 7});
    // let display = this.display;
    // display.setOptions({
    //   fontSize: 33,
    //   forceSquareRatio: true,
    // });
    document.body.appendChild(this.display.getContainer());
    document.body.appendChild(this.console.getContainer());
    this._generateMap();
    this.display.draw(2, 4, "@")
    this.console.drawText(1, 3, "Fuck off");
  },

  _generateMap: function () {
    var digger = new ROT.Map.Digger();
    console.log(digger);
    var digCallback = function (x, y, value) {
      if (value) {
        return;
      } /* do not store walls */

      var key = x + "," + y;
      this.map[key] = ".";
      //   console.log(this)
    };
    digger.create(digCallback.bind(this));
    this._drawWholeMap();
  },

  _drawWholeMap: function () {
    for (var key in this.map) {
      var parts = key.split(",");
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      this.display.draw(x, y, this.map[key]);
    }
  },
};

//   let map = ROT.Map.Arena(3, 3),
//   let userCallback = function (x, y, value) {
//     SHOW(ROT.Util.format("Value %s generated at [%s,%s]", value, x, y));
//     map.create(userCallback);
//   },
