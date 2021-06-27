let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    total = document.querySelector('.total');
    let i = 0;
let todoList = [];


if(todoList[0]!=undefined)
localStorage.setItem('todo',JSON.stringify(todoList));
   //  let elem = document.getElementsByTagName('h1')
   //  console.log(elem)
   //  setInterval(() => elem.hidden = !elem.hidden, 1000);

//Чтобы нажималась кнопка по нажатию энтер в инпуте
addMessage.addEventListener('keyup', function(event){
   event.preventDefault();
   if(event.keyCode == 13){
   addButton.click();
   }
});
    
//если в LocalStorage есть данные по ключу todo то их записываем массиву todoList
window.onload = ()=> {
   if(localStorage.getItem("todo")){
   todoList = JSON.parse(localStorage.getItem("todo")) 
   for (let index of todoList){
   createDelTodo(index.todo)
   i++
      }
   } 
};

// Прописываем действия по клику на кнопку Добавить
 addButton.addEventListener('click', function(){
   if(addMessage.value==""){return}  //блокируем создание пустых дел
   createDelTodo(addMessage.value)
   changeList()
   addMessage.value = ""; // очищаем поле инпута
   i++
 });  

 function createDelTodo (value){
   const li = document.createElement('li');
   todo.appendChild(li)
   li.className = 'li';
   li.setAttribute('id',`${i}`)
   li.textContent = value;

   const delButton = document.createElement('button');
   li.appendChild(delButton)
   delButton.className = 'btnDel';
   delButton.innerHTML = "<img class='trashImg' src='trash.png'>";

   const editButton = document.createElement('button');
   li.appendChild(editButton)
   editButton.className = 'btnEdit';
   editButton.innerHTML = "<img class='editImg' src='edit.png'>";

   delButton.addEventListener('click',() => {
      todo.removeChild(li);
   })
   editButton.addEventListener('click',() => {
      li.contentEditable = true;
   })
}
todo.addEventListener("click", () => { 
   changeList()
});

function changeList (){ 
   let lis = document.querySelectorAll('li');//[2].getAttribute('class')
   let list = [];
   for (let index of lis){
      let todo = {
         todo: index.innerText,
         checked: false
      }
    list.push(todo)
   }
   todoList = list;
   localStorage.setItem('todo',JSON.stringify(todoList));
}
