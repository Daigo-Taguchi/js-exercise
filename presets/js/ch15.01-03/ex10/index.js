const editor = document.getElementById("editor-front");
const input = document.getElementById("editor-back");

document.addEventListener("DOMContentLoaded", () => {
  editor.style.backgroundColor = "white";
});

editor.addEventListener("click", () => {
  input.focus();
  editor.style.backgroundColor = "silver";
});

input.addEventListener("input", () => {
  const text = input.value;
  editor.innerHTML = escapeHtml(text);
});

input.addEventListener("focusout", () => {
  editor.style.backgroundColor = "white";
});

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
