setTimeout(() => {
  const box = document.querySelector(".control_box");
  box.classList.add("active");
  box.style.display = "block";
  console.log("执行js中");
}, 800);
