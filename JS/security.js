let HTML = document.getElementsByTagName("html");
let a = Array.from(HTML);
console.log(a);

a.forEach((e) => {
  e.addEventListener("copy", () => {
    alert("Site Is Protected");
    window.navigator.clipboard.writeText(" ");
  });
});
window.addEventListener("contextmenu", (e) => {
  alert("Site Is Protected");
  e.preventDefault();
});
// window.addEventListener("mousedown", (e) => {
//   e.preventDefault();
// });
