const inputTitle = document.querySelector('#titleInput');
const inputDescr = document.querySelector('#descrInput');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector(".todoList");
const lists = document.querySelectorAll(".list");
const cards = document.querySelectorAll('.card');

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
  // console.log("showtasks", listArray);
  let newTag = "";
  listArray.forEach((e, index) => {
    // console.log("e",e.descr);
    newTag += `<div class="card draggable" draggable="true">
            <div class="card-title">
              <h3>${e.title}</h3>
              <input id="checkbox" type="checkbox" value="checkbox" name="checkbox" />
            </div>
            <p>${e.descr}</p>
            <div class="card-btns">
              <i class="fas fa-pen" id="editBtn${index}" onclick="editTask(${index})"></i>
              <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
            </div>
          </div>
        </div>`;
  });

  todoList.innerHTML = newTag;
  inputTitle.value = "";
  inputDescr.value = "";
}
// delete task function
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("userTasks");
  listArray = JSON.parse(getLocalStorageData);
  // console.log('delete',listArray);
  listArray.splice(index, 1);
  localStorage.setItem("userTasks", JSON.stringify(listArray));
  showTasks();
}


// edit task function
cards.forEach((card,index) => {
  editTask(index);
  registerEventsOnCard(card);
});

function editTask(index) {
    const editBtn = document.querySelector(`#editBtn${ index }`);
    let getLocalStorageData = localStorage.getItem("userTasks");
    listArray = JSON.parse(getLocalStorageData);

    editBtn.addEventListener('click',(e) => {
      // console.log('test', e.currentTarget.parentNode.parentNode.childNodes[1].nextSibling.nextSibling,index);
      if (editBtn.className === 'fas fa-pen') {
        const cardTitle = e.currentTarget.parentNode.parentNode.childNodes[1];
        const h3 = cardTitle.firstElementChild;
        const p = cardTitle.nextSibling.nextSibling;
        const titleInput = document.createElement('input');
        const descrInput = document.createElement('input');
        titleInput.type = 'text';
        descrInput.type = 'text';
        titleInput.value = h3.innerText;
        descrInput.value = p.innerText;

        cardTitle.insertBefore(titleInput,h3);
        cardTitle.insertAdjacentElement("afterend", descrInput);

        h3.remove();
        p.remove();
        editBtn.className = 'fas fa-save';

      } else {
        const cardTitle = e.currentTarget.parentNode.parentNode.childNodes[1];
        const titleInput = cardTitle.firstElementChild;
        const descrInput = e.currentTarget.parentNode.parentNode.childNodes[2];
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        h3.textContent = titleInput.value;
        p.textContent = descrInput.value;

        cardTitle.insertBefore(h3, titleInput);
        cardTitle.insertAdjacentElement("afterend", p);
        console.log('127', p.textContent);
        titleInput.remove();
        descrInput.remove();

        editBtn.className = 'fas fa-pen';
        listArray[index].title = h3.textContent;
        listArray[index].descr = p.textContent;

        localStorage.setItem("userTasks", JSON.stringify(listArray));
        showTasks();
      }
    });
  }

// drag and drop function

// cards.forEach((card) => {
//   registerEventsOnCard(card);
// });

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
