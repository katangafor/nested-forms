const darkMode = false;

const theme = {
  // need to establish a primary color, secondary, white, black, light gray, medium gray... etc
  // as variables so we can change them here and it will change across the whole website
  // this also will allow us to easily change between light and dark mode

  primary: "#0058FF",
  //#005af9 found on client dash for person icon and arrow down button
  primaryHover: "#0249CF",  
  primaryBorder: "#1229B3",
  primaryDisabled: "#123D59",

  white: "#FFFFFF",
  black: "#0A0A0A",
  red: "#EE1325",

  text: "#5A607F",
  textBorder: "#D4D9E0",

  background: "#E9ECF3",
  shadow: "#7e84a333",

  green: "#21D59B",


  // colors re-named in the interest of eventually having a dark mode
  background1: !darkMode ? "white" : "#1F2325",
  background2: !darkMode ? "#E9ECF3" : "#282C2D",
  background3: !darkMode ? "#F7F8FD" : "#282C2D",
  background4: !darkMode ? "#FBFCFD" : "#FBFCFD",
  background5: !darkMode ? "#DEE1E3" : "#DEE1E3",
  backgroundFader: !darkMode
    ? "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
    : "linear-gradient(rgba(31,36,37, 0), rgba(31,36,37, 1))",
  backgroundFaderHover: !darkMode
    ? "linear-gradient(rgba(247, 248, 253, 0), rgba(247, 248, 253, 1))"
    : "linear-gradient(rgba(40, 44, 45, 0), rgba(40, 44, 45, 1))",
  text1: !darkMode ? "black" : "white",
  // regular theme
  headerColor: "#3C3F52",
  darkBlue: "#123D59",
  blue: "#337CBA",
  vibrantBlue: "#0058FF",
  lightBlue: "#24ABE2",
  darkLightBlue: "#167ba4",
  darkerLightBlue: "#0d4861",
  bluePurple: "#1e3be3",
  textBlue: !darkMode ? "#1F3C57" : "white",
  textGray: !darkMode ? "#656565" : "white",
  labelRed: "#E60A0A",
  offWhiteBlue: "#E9ECF3",
  hoverBlue: "#e6e8f2",
  darkHoverBlue: "#CED4F3",
  peach: "#F26C76",
  
  darkRed: "#c0392b",
  redOrange: "#CF4343",
  deleteRed: "#e74c3c",
  darkDeleteRed: "#c0392b",
  
  darkGreen: "#06AD78",
  blueGrayDark: "#5A607F",
  gray: "#EDEDED",
  lightGray: "#F7F7F7",
  mediumGray: "#E6E6E6",
  borderGray: "#D4D9E0",
  darkGray: "#707070",
  softGray: "#EEEEEE",
  inputGray: "#555555",
  unselectedGray: "#8b8b8b",
  gold: "#F3D04A",
  pastelGray: "#585D77",
  darkPastelGray: "#3f4355",
  linkBlue: "#4482b5",
  eggplant: "#987195",
  darkEggplant: "#533C51",
  grass: "#4A9667",
  darkGrass: "#2F6042",
  violet: "#402D8B",
  darkViolet: "#2A1E5C",
  citron: "#D9B208",
  darkCitron: "#8A7105",
  burgerBackground: "#373B47",
  wizLabelBlue: "#28293D",
  wizPastelGray: "#5a607f",
  wizBorder: "#E6E9F4",
  wizBlue: "#0058FF",

  

  standardShadow:
    "0 7px 14px 0 rgba(65, 61, 47, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.22)",

  // media query-related sizes
  bigLaptop: "1650px",
  laptop: "1050px",

  dashWidth: "90%",
  dashMaxWidth: "1600px",

  bigLaptopHeaderHeight: "55px",
  laptopHeaderHeight: "45px",

  bigLaptopSize: "@media only screen and (min-width: 1550px)",
  laptopSize:
    "@media only screen and (min-width: 1050px) and (max-width: 1550px)",

  big: "1150px",
};

export default theme;
