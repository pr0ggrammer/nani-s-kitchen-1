// const cursor = document.querySelector('.custom-cursor');
// const gridItems = document.querySelectorAll('.grid-item');

// document.addEventListener('mousemove', (e) => {
//   cursor.style.top = `${e.clientY}px`;
//   cursor.style.left = `${e.clientX}px`;
// });

// gridItems.forEach(item => {
//   item.addEventListener('mousemove', e => {
//     const rect = item.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     item.style.setProperty('--mouse-x', `${x}px`);
//     item.style.setProperty('--mouse-y', `${y}px`);
//   });
// });
const cursor = document.querySelector('.custom-cursor');
const gridItems = document.querySelectorAll('.grid-item');

document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

gridItems.forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    item.style.setProperty('--mouse-x', `${x}px`);
    item.style.setProperty('--mouse-y', `${y}px`);
  });
});
