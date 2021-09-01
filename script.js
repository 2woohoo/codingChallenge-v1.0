const inputTitle = document.querySelector('#titleInput');
const inputDescr = document.querySelector('#descrInput');
const addBtn = document.querySelector('.add-btn');
const list = document.querySelector(".todoList");

inputTitle.onkeyup = () => {
  let userData = {
    title: inputTitle.value,
    descr: inputDescr.value
  };
  // console.log("keyup", userData);
  if (userData!= null) {
    addBtn.classList.add("active");
  }
  else{
    addBtn.classList.remove("active");
  }
}

showTasks();
let userdata = [];

addBtn.addEventListener('click', () => {
  let userData = {
    title: inputTitle.value,
    descr: inputDescr.value
  };
  let getLocalStorageData = localStorage.getItem("userTasks");
  if(getLocalStorageData == null){
    listArray = [];
  }
  else{
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userData);
  localStorage.setItem("userTasks", JSON.stringify(listArray));
  showTasks();
  addBtn.classList.remove("active");
})

function showTasks(params) {
  let getLocalStorageData = localStorage.getItem("userTasks");
  if (getLocalStorageData == null) {
    listArray = [];
  }
  else {
    listArray = JSON.parse(getLocalStorageData);
  }
  console.log("lists", listArray);
  let newLiTag = "";
  listArray.forEach((e, index) => {
    console.log("e",e.descr);
    newLiTag += `<div class="card draggable" draggable="true">
            <div class="card-title">
              <h3>${e.title}</h3>
              <input class="checkbox-effect checkbox-effect-1" id="get-up-1" type="checkbox" value="get-up-1" name="get-up-1" />
            </div>
            <p>${e.descr}</p>
            <div class="card-btns">
              <i class="fas fa-pen"></i>
              <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
            </div>
          </div>
        </div>`;
  });

  list.innerHTML = newLiTag;
  inputTitle.value = "";
  inputDescr.value = "";
}
// delete task function
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("userTasks");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("userTasks", JSON.stringify(listArray));
  showTasks();
}

// drag and drop function
const lists = document.querySelectorAll(".list");
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  registerEventsOnCard(card);
});

lists.forEach((list) => {
  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    let draggingCard = document.querySelector('.dragging');
    let cardAfterDraggingCard = getCardAfterDraggingCard(list, e.clientY);
    if (cardAfterDraggingCard) {

      cardAfterDraggingCard.parentNode.insertBefore(draggingCard, cardAfterDraggingCard);
    } else {
      list.appendChild(draggingCard);
    }

  });
});

function getCardAfterDraggingCard(list, yDraggingCard) {
  let listCards = [...list.querySelectorAll('.card:not(.dragging)')];

  return listCards.reduce((closestCard, nextCard) => {
    let nextCardRect = nextCard.getBoundingClientRect();
    let offset = yDraggingCard - nextCardRect.top - nextCardRect.height / 2;

    if (offset < 0 && offset > closestCard.offset) {
      return { offset, element: nextCard }
    } else {
      return closestCard;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function registerEventsOnCard(card) {
  card.addEventListener('dragstart', (e) => {
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', (e) => {
    card.classList.remove('dragging');
  });
}
