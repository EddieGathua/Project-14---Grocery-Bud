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

    //edit item on click
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", (e) => {
      const element = e.currentTarget.parentElement.parentElement;
      editElement = e.currentTarget.parentElement.previousElementSibling;
      //set form value
      grocery.value = editElement.textContent;
      //set edit flag
      editFlag = true;
      //set edit id
      editID = element.getAttribute("data-id");
      //change button text
      submitBtn.textContent = "Edit";
    });

    //delete item on click
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      const element = e.currentTarget.parentElement.parentElement;
      element.remove();
      if (list.children.length === 0) {
        container.classList.remove("show-container");
      }
      displayAlert("Item deleted.", "danger");
      //reset form
      resetForm();
    });

    //append list item to list
    list.appendChild(element);
    //display alert
    displayAlert("Item added to list", "success");
    container.classList.add("show-container");
    //reset form
    resetForm();
  } else if (value && editFlag) {
    //edit item
    editElement.textContent = value;
    //display alert
    displayAlert("Item edited.", "success");
    //reset form
    resetForm();
  } else {
    displayAlert("Please enter a grocery item", "danger");
  }
});

//clear list
clearBtn.addEventListener("click", () => {
  list.innerHTML = "";
  displayAlert("List cleared", "danger");
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

//function to set back to default state
function resetForm() {
  grocery.value = "";
  submitBtn.textContent = "Submit";
  editFlag = false;
  editID = "";
}
