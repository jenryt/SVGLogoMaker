// characters, textColor, shape , shapeColor
class Shapes {
  setLogoColor(shapeColor) {
    this.shapeColor = shapeColor;
  }
  setText(characters, textColor) {
    this.characters = characters;
    this.textColor = textColor;
  }
  renderText() {
    // console.log("this.characters", this.characters);
    return `<text x="150" y="125" font-size="60" text-anchor="middle" 
    fill="${this.textColor}">${this.characters.trim().toUpperCase()}</text>`;
  }
}

class Triangle extends Shapes {
  renderLogoShape() {
    return `<polygon points="25,200 150,1 275,200" fill="${this.shapeColor}" />`;
  }
  renderText() {
    return `<text x="150" y="132" font-size="60" text-anchor="middle" 
    fill="${this.textColor}">${this.characters.trim().toUpperCase()}</text>`;
  }
}
class Circle extends Shapes {
  renderLogoShape() {
    return `<circle cx="150" cy="100" r="98" fill="${this.shapeColor}" />`;
  }
}
class Square extends Shapes {
  renderLogoShape() {
    return `<rect x="50" y="1" width="198" height="198" fill="${this.shapeColor}" />`;
  }
}

module.exports = { Triangle, Circle, Square };
