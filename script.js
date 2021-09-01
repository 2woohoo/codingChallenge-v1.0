// import "drag";

const inputTitle = document.querySelector('#titleInput');
const inputDescr = document.querySelector('#descrInput');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector(".todoList");

// addBtn.addEventListener('click',(e) => {
//   console.log(e.currentTarget);
// })

// const toDoLists = localStorage.getItem() =inputTitle.value;
// document.querySelector(".card-title").innerHTML = localStorage.title;

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
  // console.log("click", userData);
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
    newLiTag += `<div class="card">
            <div class="card-title">
              <h3>${e.title}</h3>
              <input class="checkbox-effect checkbox-effect-1" id="get-up-1" type="checkbox" value="get-up-1" name="get-up-1" />
            </div>
            <p>${e.descr}</p>
          </div>
        </div>`;
  });
  todoList.innerHTML = newLiTag;
  inputTitle.value = "";
  inputDescr.value = "";

}
