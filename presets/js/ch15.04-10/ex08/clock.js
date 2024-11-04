function secondClock() {
  // svg要素用のXML名前空間。
  const svg = "http://www.w3.org/2000/svg";

  const secondHand = document.createElementNS(svg, "line");
  secondHand.setAttribute("class", "secondhand");
  secondHand.setAttribute("stroke-width", "1");
  secondHand.setAttribute("x1", "50");
  secondHand.setAttribute("y1", "50");
  secondHand.setAttribute("x2", "50");
  secondHand.setAttribute("y2", "75");

  return secondHand;
}

document.querySelector(".hands").append(secondClock());
