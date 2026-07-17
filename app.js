const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeBtn");

loginBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});