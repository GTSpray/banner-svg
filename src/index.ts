import svgStyle from "./svg/styles.xcss";

import banner0 from "./svg/banner0.svg";
import banner1 from "./svg/banner1.svg";
import banner2 from "./svg/banner2.svg";
import banner3 from "./svg/banner3.svg";
import banner4 from "./svg/banner4.svg";

document.getElementById("app").innerHTML = `
<canvas></canvas>
<input type="text" id="pseudo" value="" />
<div>
${banner0}
${banner1}
${banner2}
${banner3}
${banner4}
</div>
`;

const addStyle = (element, styles) => {
  let defs = element.querySelector("defs");
  if (!defs) {
    defs = document.createElement("defs");
    element.appendChild(defs);
  }
  const css = document.createElement("style");
  css.type = "text/css";
  if (css.styleSheet) {
    css.styleSheet.cssText = styles;
  } else {
    css.appendChild(document.createTextNode(styles));
  }
  defs.appendChild(css);
};

const canvas = document.querySelector("canvas");
const win = window.URL || window.webkitURL || window;
const draw = (svg) => {
  const { width, height } = svg.getBoundingClientRect();
  const data = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  const blob = new Blob([data], { type: "image/svg+xml" });
  const url = win.createObjectURL(blob);
  img.onload = () => {
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    canvas.getContext("2d").drawImage(img, 0, 0, width, height);
    win.revokeObjectURL(url);
  };
  img.onerror = () => console.log("fail to load svg");
  img.src = url;
};

const refresh = (value: string) => {
  const name = value.trim();
  for (const element of nameContainers) {
    const max = parseInt(element.getAttribute("data-max"), 10);
    element.textContent = `${name.substring(0, max)}`;
  }
};

const input = document.querySelector("input");
const nameContainers = document.getElementsByClassName("name");
input.oninput = (e) => {
  refresh(e.target.value);
};

input.value = "Harry Cover";
refresh(input.value);

const svgs = document.querySelectorAll("svg");
for (const svg of svgs) {
  const { width, height } = svg.getBoundingClientRect();
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.onclick = function () {
    draw(this);
  };
  addStyle(svg, svgStyle);
}
