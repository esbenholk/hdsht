import { useEffect, useState } from "react";
import { randomNumber } from "./utils";

/**
 * Class representing one line
 */
class Line {
  // line position
  position = -1;
  // cells/chars
  cells = [];

  /**
   * Constructor.
   * @param {number} linePosition - the position of the line
   */
  constructor(linePosition) {
    this.position = linePosition;
  }
}

/**
 * Class representing one cell/char
 */
class Cell {
  // DOM elements
  DOM = {
    // the char element (<span>)
    el: null,
  };
  // cell position
  position = -1;
  // previous cell position
  previousCellPosition = -1;
  // original innerHTML
  original;
  // current state/innerHTML
  state;
  color;
  originalColor;
  // cached values
  cache;

  /**
   * Constructor.
   * @param {Element} DOM_el - the char element (<span>)
   * @param {Object} positionObj - the cell's position object
   */
  constructor(DOM_el, { position, previousCellPosition } = {}) {
    this.DOM.el = DOM_el;
    this.original = this.DOM.el.innerHTML;
    this.state = this.original;
    this.color = this.originalColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-text");
    this.position = position;
    this.previousCellPosition = previousCellPosition;
  }
  /**
   * @param {string} value
   */
  set(value) {
    this.state = value;
    this.DOM.el.innerHTML = this.state;
  }
}

/**
 * Component representing the TypeShuffle object
 */
export default function TypeShuffle({ text }) {
  // DOM elements
  const [el, setEl] = useState(null);
  // array of Line objs
  const [lines, setLines] = useState([]);
  // array of letters and symbols
  const lettersAndSymbols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "@",
    "#",
    "$",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "<",
    ">",
    ",",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  // effects and respective methods
  const [activeEffect, setActiveEffect] = useState(null);

  const handleEffectChange = (effectName) => {
    setActiveEffect(effectName);
    effectseffectName;
  };

  const fx1 = () => {
    // logic for effect 1
  };

  const fx2 = () => {
    // logic for effect 2
  };

  const fx3 = () => {
    // logic for effect 3
  };

  const fx4 = () => {
    // logic for effect 4
  };

  const fx5 = () => {
    // logic for effect 5
  };

  const fx6 = () => {
    // logic for effect 6
  };

  return (
    <div>
      <h1>Effects Demo</h1>
      <div>
        <button onClick={() => handleEffectChange("fx1")}>Effect 1</button>
        <button onClick={() => handleEffectChange("fx2")}>Effect 2</button>
        <button onClick={() => handleEffectChange("fx3")}>Effect 3</button>
        <button onClick={() => handleEffectChange("fx4")}>Effect 4</button>
        <button onClick={() => handleEffectChange("fx5")}>Effect 5</button>
        <button onClick={() => handleEffectChange("fx6")}>Effect 6</button>
      </div>
    </div>
  );
}
