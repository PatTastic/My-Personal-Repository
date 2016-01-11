$.event.props.push("touches");


(function ($) {
  $.expr[':'].inActive = function (objNode, intStackIndex, arrProperties, arrNodeStack) {
    return !$(objNode).data('active');
  };

  var toggleActive = function () {
    var range = $(this);
    var current = range.data('active');
    range.data('active', !current);
  };

  $.fn.range = function () {
    return this.each(function () {
      var input = $(this);

      input.on('mousedown mouseup', toggleActive);
      input.on('touchstart touchend', toggleActive);
    });
  };
})(jQuery);


var colour = (function () {

  var red, green, blue, callbacks = [];
  var div = document.createElement('div');
  var hexRegex = /^(?:[0-9a-f]{3}){1,2}$/i,
      rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)$/;

  var pad = function (n, length) {
    length = length || 2;
    return (n = n + "", n.length >= length) ? n : pad("0" + n, length);
  };

  var setColour = function (value) {
    div.style.backgroundColor = value;
    if(!rgbRegex.test(div.style.backgroundColor)) return;
    var matches = rgbRegex.exec(div.style.backgroundColor).map(function (colour, i) {
      return i === 0 ? colour : parseInt(colour, 10);
    });
    red = matches[1];
    green = matches[2];
    blue = matches[3];
  };

  var triggerCallbacks = function () {
    callbacks.forEach(function (callback) {
      callback(colour);
    });
  };

  red = green = blue = 0;

  var colour = Object.create({}, {

    asJSON: {
      value: function () {
        return {
          rgb: this.rgb,
          hsl: this.hsl,
          hex: this.hex
        };
      }
    },

    onChange: {
      value: function (callback) {
        callbacks.push(callback);
      }
    },

    rgb: {
      get: function () {
        return {
          red: red,
          green: green,
          blue: blue
        };
      },

      set: function (rgb) {
        red = parseInt(rgb.red, 10),
          green = parseInt(rgb.green, 10),
          blue = parseInt(rgb.blue, 10);
        triggerCallbacks();
      }
    },

    rgbString: {
      get: function () {
        return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
      }
    },

    hsl: {
      get: function () {
        var r = red / 255,
            g = green / 255,
            b = blue / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }

        return {
          hue: Math.floor(h * 360),
          saturation: Math.floor(s * 100),
          lightness: Math.floor(l * 100)
        };
      },

      set: function (hsl) {
        setColour(typeof hsl === "string" ? hsl : 'hsl(' + parseInt(hsl.hue, 10) + ', ' + parseInt(hsl.saturation, 10) + '%, ' + parseInt(hsl.lightness, 10) + '%)');
        triggerCallbacks();
      }
    },

    hslString: {
      get: function () {
        var hsl = this.hsl;
        return 'hsl(' + hsl.hue + ', ' + hsl.saturation + '%, ' + hsl.lightness + '%)';
      }
    },

    hex: {
      get: function () {
        return ["#", pad(red.toString(16)), pad(green.toString(16)), pad(blue.toString(16))].join("");
      },

      set: function (hex) {
        setColour(hex);
        triggerCallbacks();
      }
    }
  });

  return colour;
})();

colourpicker = (function () {

  var callbacks = [],
      colours = [];

  var init = function () {
    var canvas = document.querySelector("canvas"),
        context = canvas.getContext('2d');

    for (var x = 0; x < 360; x++) {
      colours[x] = [];
      for (var y = 0; y < 100; y++) {
        colours[x][y] = context.fillStyle = 'hsl(' + x + ', ' + (100 - y) + '%, 50%)';
        context.fillRect(x, y, 2, 2);
      }
    }

    var $canvas = $(canvas);
    var scalingRatio = 360 / $canvas.width();

    var getColour = function (e) {
      var offsetX = (e.type.indexOf("touch") !== -1 ? e.touches[0].pageX : e.pageX) - $canvas.offset().left,
          offsetY = (e.type.indexOf("touch") !== -1 ? e.touches[0].pageY : e.pageY) - $canvas.offset().top;

      return {
        hue: parseInt(offsetX * scalingRatio, 10),
        saturation: (100 - parseInt(offsetY * scalingRatio, 10)),
        lightness: 50
      };
    };

    var performCallbacks = function (e) {
      callbacks.forEach(function (callback) {
        callback(getColour(e));
      });
    };

    var unbindEvents = function (e) {
      $canvas.off('.colorpicker');
    };


    $canvas.on('mousedown touchstart', function (e) {
      $canvas.on('mousemove.colorpicker touchmove.colorpicker', performCallbacks);
      $canvas.one('mouseleave.colorpicker touchcancel.colorpicker', unbindEvents);
      $canvas.one('mouseup.colorpicker touchend.colorpicker', unbindEvents);
      e.preventDefault();
    });

    $canvas.on('click', performCallbacks);
  };

  var colourSelected = function (callback) {
    callbacks.push(callback);
  };

  return {
    init: init,
    colourSelected: colourSelected
  };
})();

var colourPreviewView = (function () {

  var elem;

  var init = function () {
    elem = document.getElementById("preview");
    colour.onChange(displayColor);
  };

  var displayColor = function () {
    elem.style.backgroundColor = colour.hex;
  };

  return {
    init: init
  };
})();

var hexControlView = (function () {
  var selector = "#hex-controls-container",
      elem,
      eType,
      changeCallbacks = [];

  var init = function () {
    elem = $(selector);
    elem.on('change keyup', 'input', callChangeCallbacks);
    colour.onChange(displayHexColour);
  };

  var displayHexColour = function (e) {
    if(eType === "keyup") return;
    elem.find('input').val(colour.hex);
  };

  var callChangeCallbacks = function (e) {
    e.preventDefault();
    eType = e.type;
    var value = this.value;
    changeCallbacks.forEach(function (cb) {
      cb(value);
    });
  };

  var onChange = function (cb) {
    changeCallbacks.push(cb);
  };

  return {
    init: init,
    onChange: onChange
  };
})();

var hslControlView = (function () {

  var selector = "#hsl-controls-container",
      elem,
      changeCallbacks = [];

  var init = function () {
    elem = $(selector);
    colour.onChange(displayHSLColour);

    elem.on('change', 'input', callChangeCallbacks);
    elem.find('input[type="range"]').range();
  };

  var callChangeCallbacks = function (e) {
    var hslObj = Array.prototype.reduce.call(elem.find("input[type='range']"), function (memo, elem) {
      memo[elem.name] = elem.value;
      return memo;
    }, {});

    hslObj[this.name] = this.value;

    changeCallbacks.forEach(function (cb) {
      cb(hslObj);
    });
  };

  var displayHSLColour = function () {
    elem.find('#hueValue, #hueRange:inActive')
      .val(colour.hsl.hue)
      .end()

      .find('#saturationValue, #saturationRange:inActive')
      .val(colour.hsl.saturation)
      .end()

      .find('#lightnessValue, #lightnessRange:inActive')
      .val(colour.hsl.lightness)
      .end();
  };

  var onChange = function (cb) {
    changeCallbacks.push(cb);
  };

  return {
    init: init,
    onChange: onChange
  };
})();

var rgbControlView = (function () {

  var selector = "#rgb-controls-container",
      elem,
      changeCallbacks = [];

  var init = function () {
    elem = $(selector);
    colour.onChange(displayRGBColour);
    elem.delegate('input', 'change', callChangeCallbacks);
    elem.find('input[type="range"]').range();
  };

  var callChangeCallbacks = function (e) {
    var rgbObj = Array.prototype.reduce.call(elem.find("input[type='range']"), function (memo, elem) {
      memo[elem.name] = elem.value;
      return memo;
    }, {});

    rgbObj[this.name] = this.value;

    changeCallbacks.forEach(function (cb) {
      cb(rgbObj);
    });
  };

  var displayRGBColour = function () {
    elem.find('#redValue, #redRange:inActive')
      .val(colour.rgb.red)
      .end()

      .find('#greenValue, #greenRange:inActive')
      .val(colour.rgb.green)
      .end()

      .find('#blueValue, #blueRange:inActive')
      .val(colour.rgb.blue)
      .end();
  };

  var onChange = function (cb) {
    changeCallbacks.push(cb);
  };

  return {
    init: init,
    onChange: onChange
  };
})();

$(function () {
  colourpicker.init();
  colourPreviewView.init();
  hexControlView.init();
  hslControlView.init();
  rgbControlView.init();

  colourpicker.colourSelected(function (hsl) {
    colour.hsl = hsl;
  });

  hexControlView.onChange(function (hex) {
    colour.hex = hex;
  });

  hslControlView.onChange(function (hsl) {
    colour.hsl = hsl;
  });

  rgbControlView.onChange(function (rgb) {
    colour.rgb = rgb;
  });

  // set an initial random colour
  colour.rgb = {
    red: Math.floor(Math.random() * 256),
    blue: Math.floor(Math.random() * 256),
    green: Math.floor(Math.random() * 256)
  };
});

$('td').click(function() {
   $(this).css('backgroundColor', colour.hex);
});

$(document).ready(function(){
    $("button").click(function(){
        $(".border-on").toggleClass("border-off");
    });
});
