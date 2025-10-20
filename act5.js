    const list = document.getElementById("list");
const input = document.getElementById("itemInput");
const addbutton = document.getElementById("addbutton");
const highlightbutton = document.getElementById("highlightbutton");
const removebutton = document.getElementById("removebutton");

addbutton.addEventListener("click", () => {
  const value = input.value.trim();
  if (value !== "") {
    const li = document.createElement("li");
    li.textContent = value;
    list.appendChild(li);
    input.value = "";
  }
});

highlightbutton.addEventListener("click", () => {
  const items = list.querySelectorAll("li");
  items.forEach(li => {
    li.style.backgroundColor = "yellow";
  });
});

removebutton.addEventListener("click", () => {
  list.innerHTML = "";
});
