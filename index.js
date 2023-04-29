const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Circle, Square } = require("./lib/shape");

inquirer
  .prompt([
    {
      name: "characters",
      message: "Please enter up to three characters.",
      type: "input",
      validate: (characters) => {
        if (characters.trim().toUpperCase().length === 0) {
          return "Please enter at least one character.";
        } else if (characters.trim().toUpperCase().length > 3) {
          return "Oopsie, you can only enter UP TO THREE CHARACTERS";
        } else {
          return true;
        }
      },
    },
    {
      name: "textColor",
      message:
        "For the color of your characters, please enter a color keyword (OR a hexadecimal number.)",
      type: "input",
      validate: (textColor) => {
        if (textColor.trim().toUpperCase().length === 0) {
          return "Please enter a color keyword (OR a hexadecimal number.)";
        } else if (checkColor(textColor)) {
          return true;
        } else {
          return "Please enter a valid color keyword (OR a hexadecimal number.)";
        }
      },
    },
    {
      name: "shape",
      message: "Please choose a shape for your logo.",
      type: "list",
      choices: ["triangle", "circle", "square"],
    },
    {
      name: "shapeColor",
      message:
        "For the background color of your logo, please enter a color keyword (OR a hexadecimal number.)",
      type: "input",
      validate: (shapeColor) => {
        if (shapeColor.trim().toUpperCase().length === 0) {
          return "Please enter a color keyword (OR a hexadecimal number.)";
        } else if (checkColor(shapeColor)) {
          return true;
        } else {
          return "Please enter a valid color keyword (OR a hexadecimal number.)";
        }
      },
    },
  ])
  .then((data) => {
    console.log(data);
    let logoShape;
    switch (data.shape) {
      case "triangle":
        logoShape = new Triangle();
        break;
      case "circle":
        logoShape = new Circle();
        break;
      case "square":
        logoShape = new Square();
        break;
    }

    svgMaker(data, logoShape);
  });
// characters, textColor, shape , shapeColor
function svgMaker(data, logoShape) {
  logoShape.setLogoColor(data.shapeColor);
  logoShape.setText(data.characters, data.textColor);

  const svgContent = `
            <svg version="1.1"
            width="300" height="200"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="transparent" />

            ${logoShape.renderLogoShape()}
            ${logoShape.renderText()}
            </svg>`;
  fs.writeFile(
    `./examples/${data.characters.toUpperCase()}_${data.shape}.svg`,
    svgContent,
    (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("success");
    }
  );
}

function checkColor(colorInput) {
  const hexColorRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  const cssColorNameRegex =
    /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/i;

  if (colorInput.trim().toUpperCase().length === 0) {
    return "Please enter a color keyword (OR a hexadecimal number.)";
  } else if (hexColorRegex.test(colorInput)) {
    return true;
  } else if (cssColorNameRegex.test(colorInput)) {
    return true;
  } else {
    return false;
  }
}
