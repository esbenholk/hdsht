import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const Shuffle = ({ word }) => {
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
  const characters = word.split("");
  const randomCharacter = (ref) => {
    const normalTtext = ref.current.innerText;
    const normalColor = ref.current.style.color;

    const colors = [
      "#3e775d",
      "#61dca3",
      "#61b3dc",
      "#3e77d0",
      "#ff00ff",
      "#ffffff",
      "#aaddff",
    ];
    const random = Math.floor(Math.random() * lettersAndSymbols.length);
    const randomColor = Math.floor(Math.random() * colors.length);
    ref.current.animate(
      [
        {
          y: -10,
          transform: "translateY(0px)",
          opacity: 0,
        },
        {
          y: -7.5,
          transform: "translateY(-10px)",
          opacity: 0.5,
        },
        {
          y: 0,
          transform: "translateY(0px)",
          opacity: 1,
        },
      ],
      {
        duration: 0.7,
        delay: Math.random(5000),
        iterations: 1,
      }
    );
    //change the ref.current.innerText to a random character and random color 5 times in 500ms. then change it back to the normal text and color
    setTimeout(() => {
      ref.current.innerText = lettersAndSymbols[random];
      ref.current.style.color = colors[randomColor];
    }, 0);
    setTimeout(() => {
      ref.current.innerText = lettersAndSymbols[random];
      ref.current.style.color = colors[randomColor];
    }, Math.random() * 100);
    setTimeout(() => {
      ref.current.innerText = lettersAndSymbols[random];
      ref.current.style.color = colors[randomColor];
    }, Math.random() * 200);
    setTimeout(() => {
      ref.current.innerText = lettersAndSymbols[random];
      ref.current.style.color = colors[randomColor];
    }, Math.random() * 300);
    setTimeout(() => {
      ref.current.innerText = lettersAndSymbols[random];
      ref.current.style.color = colors[randomColor];
    }, Math.random() * 400);
    setTimeout(() => {
      ref.current.innerText = normalTtext;
      ref.current.style.color = normalColor;
    }, Math.random() * 500);
    setTimeout(() => {
      ref.current.innerText = normalTtext;
      ref.current.style.color = normalColor;
    }, 600);
  };

  const shuffle = (ref) => {
    if (ref.current) {
      randomCharacter(ref);
    }
  };

  return (
    <motion.span>
      {characters.map((character, key) => {
        const letter = useRef();
        const inView = useInView(letter, { once: true });
        inView && shuffle(letter);
        return (
          <motion.span
            ref={letter}
            animate={
              inView
                ? { opacity: 1, transition: { duration: 0.5 } }
                : {
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                    },
                  }
            }
            key={key}
          >
            {character}
          </motion.span>
        );
      })}{" "}
    </motion.span>
  );
};
export default Shuffle;
