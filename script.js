// let count = 100;
// const counter = document.getElementById('count');

// // Fast countdown from 100 to 1
// const interval = setInterval(() => {
//   count--;
//   counter.innerText = count;
//   if (count <= 1) clearInterval(interval);
// }, 25); // speed: 25ms per count
let count = 100;
const counter = document.getElementById("counter");

const countdown = setInterval(() => {
  count--;
  counter.textContent = count;

  if (count <= 0) {
    clearInterval(countdown);
    counter.textContent = "Done!";
  }
}, 30); // fast countdown
