const { Triangle, Circle, Square } = require("../lib/shape");

describe("renderLogoShape method", () => {
  it("should render the corresponding shape and shape color of user's choice.", () => {
    const circle = new Circle();
    circle.setLogoColor("#5c7d83");
    expect(circle.renderLogoShape()).toEqual(
      `<circle cx="150" cy="100" r="98" fill="#5c7d83" />`
    );
  });
});
describe("renderText method", () => {
  it("should insert and uppercase the logo text given by the user with the text color of user's choice.", () => {
    const square = new Square();
    square.setText("svg", "#fff");
    expect(square.renderText())
      .toEqual(`<text x="150" y="125" font-size="60" text-anchor="middle" 
    fill="#fff">SVG</text>`);
  });
  it("should adjust the text styling with triangle is the chosen shape.", () => {
    const triangle = new Triangle();
    triangle.setText("svg", "white");
    expect(triangle.renderText())
      .toEqual(`<text x="150" y="132" font-size="60" text-anchor="middle" 
    fill="white">SVG</text>`);
  });
});
