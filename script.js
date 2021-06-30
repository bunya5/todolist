let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    finishedTodo = document.querySelector('.finishedTodo'),
    total = document.querySelector('.total');
    let finishedTasks = [];

    let todoList = [];
    const totalTodo = document.createElement('p')
    total.appendChild(totalTodo)

    let randomNum = Math.floor(Math.random() * 100);
function genID(x) { return(x + (new Date).getTime());}
    let randomId = genID(randomNum);

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
   if(localStorage.getItem("finishedTasks")){ finishedTasks = JSON.parse(localStorage.getItem("finishedTasks"))}
   for (let index of todoList){ 
      if(finishedTasks.includes(`${index.id}`)){
         createDelTodo(index,'finished',finishedTodo)
       } else createDelTodo(index,'todo',todo)
     }
   } 
};

// Прописываем действия по клику на кнопку Добавить
 addButton.addEventListener('click', function(){
   if(addMessage.value==""){return}  //блокируем создание пустых дел
   let todoObj = {
      todo: addMessage.value,
      id: genID(randomNum)
   };
   todoList.push(todoObj)
   localStorage.setItem('todo',JSON.stringify(todoList));

   createDelTodo(todoObj,'todo',todo)
   addMessage.value = ""; // очищаем поле инпута
 });  


 function createDelTodo (todoObj,className,nodeName){

   totalTodo.innerHTML = `Количество задач:  ${todoList.length}`;
   
   const li = document.createElement('li');
   nodeName.appendChild(li)
   li.setAttribute('data-index',todoObj.id)

   const label = document.createElement('label');
   li.appendChild(label)
   label.setAttribute('data-index',todoObj.id)
   label.textContent = todoObj.todo;  
   label.classList.add(className)

   const editInput = document.createElement('input');
   editInput.type = "text";
   li.appendChild(editInput)
   editInput.classList.add('editInput');

   const delButton = document.createElement('img');
   li.appendChild(delButton)
   delButton.setAttribute('src','images/trash.svg')
   delButton.setAttribute('id','delBtn')
   delButton.setAttribute('data-index',todoObj.id)

   const editButton = document.createElement('img');
   li.appendChild(editButton)
   editButton.setAttribute('src','images/edit.svg')
   editButton.setAttribute('id','editBtn')
   editButton.setAttribute('data-index',todoObj.id)

   const saveButton = document.createElement('img');
   li.appendChild(saveButton)
   saveButton.setAttribute('src','images/save.svg')
   saveButton.classList.add('hideSaveBtn');

   delButton.addEventListener('click',() => {
      for(let z = 0; z < todoList.length; z++) {
         if(todoList[z].id == delButton.getAttribute('data-index')) {
             
             if(delButton.parentNode.parentNode.classList.contains('finishedTodo')) {
               finishedTodo.removeChild(delButton.parentNode)
               if(finishedTasks.indexOf(delButton.getAttribute('data-index')) != -1) {
               finishedTasks.splice(finishedTasks.indexOf(delButton.getAttribute('data-index')), 1)
               localStorage.setItem('finishedTasks',JSON.stringify(finishedTasks))
               }
            }
             else {
                todo.removeChild(delButton.parentNode)
               }
               todoList.splice(z, 1)
               localStorage.setItem('todo',JSON.stringify(todoList));
               totalTodo.innerHTML = `Количество задач:  ${todoList.length}`;
         }
     }
   })

   label.addEventListener('click',()=>{
      label.classList.toggle('finished')
      if(label.classList.contains('finished')){
         finishedTodo.appendChild(li)
         finishedTasks.push(label.getAttribute('data-index'))
      } else {
         todo.appendChild(li)
         for(let z = 0; z < finishedTasks.length; z++) {
            if(finishedTasks[z] == label.getAttribute('data-index')) {
               finishedTasks.splice(z, 1);}
      }
   } 
   localStorage.setItem('finishedTasks',JSON.stringify(finishedTasks))
   })
  
   editButton.addEventListener('click',(event) => {
      li.classList.toggle('editMode')
      editButton.classList.toggle('editButton')
      saveButton.setAttribute('id','saveBtn')
      event.preventDefault();

      if(li.classList.contains('editMode')){
         editInput.value = label.textContent;
         editInput.focus()
        
         function changeStyleAfter (){
               if (editInput.value != ''){
               li.classList.remove('editMode') 
               editButton.classList.remove('editButton')
               saveButton.removeAttribute('id','saveBtn') 
               saveChangedText()
            } else{ 
               alert('Поле не должно быть пустым');
               editInput.focus()
            }
         }
         function saveChangedText(){ 
            label.textContent = editInput.value; 
            for(let z = 0; z < todoList.length; z++) {
            if(todoList[z].id == editButton.getAttribute('data-index')) {
               todoList[z].todo = label.textContent;
               localStorage.setItem('todo',JSON.stringify(todoList));
               }
            } 
         }
         editInput.addEventListener('keyup', function(event){
            event.preventDefault();
            if(event.keyCode == 13){
               changeStyleAfter()
            }
         }) 
         editInput.addEventListener('blur',()=> {
            event.preventDefault();
            changeStyleAfter()
         })
      } else {
         saveChangedText()
      }
   })
}



