let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    total = document.querySelector('.total');
    let i = 0;
let todoList = [];

if(todoList[0]!=undefined)
localStorage.setItem('todo',JSON.stringify(todoList));

//Чтобы нажималась кнопка по нажатию энтер в инпуте
addMessage.addEventListener('keyup', function(event){
   event.preventDefault();
   if(event.keyCode == 13){
   addButton.click();
   }
});
    
//при загрузки страницы, если в LocalStorage есть данные по ключу todo то их записываем массиву todoList
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

   const label = document.createElement('label');
   li.appendChild(label)
   label.textContent = value;

   const editInput = document.createElement('input');
   editInput.type = "text";
   li.appendChild(editInput)
   editInput.classList.add('editInput');

   const delButton = document.createElement('img');
   li.appendChild(delButton)
   delButton.classList.add('btnDel');
   delButton.setAttribute('src','images/trash.svg')

   const editButton = document.createElement('img');
   li.appendChild(editButton)
   editButton.classList.add('btnEdit');
   editButton.setAttribute('src','images/edit.svg')

   delButton.addEventListener('click',() => {
      todo.removeChild(li);
   })

   label.addEventListener('click',()=>{
      label.classList.toggle('finished')
   })
  
   editButton.addEventListener('click',(event) => {
      li.classList.toggle('editMode')
      editButton.classList.toggle('editMode')
      event.preventDefault();
      containsClass = li.classList.contains('editMode');
      if(containsClass){
         editInput.value = label.textContent;
         editInput.focus()

         editInput.addEventListener('blur',()=> {
           console.log(event.target)
           li.classList.remove('editMode') 
           label.textContent = editInput.value; 
         })

      } else {
         label.textContent = editInput.value;
      }
   })
   
}
todo.addEventListener("click", () => changeList());

function changeList (){ 
   let liFromPage = document.querySelectorAll('li');       //[2].getAttribute('class')
   let listOfLi = [];
   for (let index of liFromPage){
      let todo = {
         todo: index.innerText,
         checked: false
      }
      listOfLi.push(todo)
   }
   todoList = listOfLi;
   localStorage.setItem('todo',JSON.stringify(todoList));
}

