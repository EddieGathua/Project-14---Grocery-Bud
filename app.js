const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    //create new list item
    const element = document.createElement("article");
    //add class to list item
    element.classList.add("grocery-item");
    //add id to list item
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    //create text node
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
    //append list item to list
    list.appendChild(element);
    //display alert
    displayAlert("Item added to list", "success");
    container.classList.add("show-container");
    //clear input
    grocery.value = "";
  } else if (value && editFlag) {
  } else {
    displayAlert("Please enter a grocery item", "danger");
  }
});

//clear list
clearBtn.addEventListener("click", () => {
  list.innerHTML = "";
  displayAlert("List cleared", "success");
  container.classList.remove("show-container");
});

//function to display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}
