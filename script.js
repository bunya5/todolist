let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');
    let todoList = [];
    if(localStorage.getItem("todo")){
        todoList = JSON.parse(localStorage.getItem("todo"))
        showMessages(); 
        console.log(JSON.parse(localStorage.getItem("todo")))
     }

 addButton.addEventListener('click', function(){
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    todoList.push(newTodo);
    localStorage.setItem("todo",JSON.stringify(todoList));
    showMessages();  
 });  
 
 function showMessages (){
    let showMessage = '';
     todoList.forEach(function(item,i){
     showMessage += `
     <li>
     <input type='checkbox' id='item_${i}'>
     <label for='item_${i}'>${item.todo}<label>
     </li>
     `;
     todo.innerHTML = showMessage;
     
     });
 };
 