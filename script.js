// allikas: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

function kerigeRetseptiJuurde() {
    const retseptElement = document.getElementById("retsept1");
    retseptElement.scrollIntoView({ behavior: "smooth" });
}
