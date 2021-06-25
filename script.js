let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');
    let todoList = [];

    //Чтобы нажималась кнопка по нажатию энтер в инпуте
    addMessage.addEventListener('keyup', function(event){
        event.preventDefault();
        if(event.keyCode == 13){
            addButton.click();
        }
    });
    
    //если в LocalStorage есть данные по ключу todo то их записываем массиву todoList
    if(localStorage.getItem("todo")){
        todoList = JSON.parse(localStorage.getItem("todo"))
        showMessages(); 
     }
// Прописываем действия по клику на кнопку Добавить
 addButton.addEventListener('click', function(){
     if(addMessage.value==""){return}  //блокируем создание пустых дел
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }; // создаем объект с нашим делом
    todoList.push(newTodo); // добавляем созданный объект в массив
    localStorage.setItem("todo",JSON.stringify(todoList)); // отправляем наш массив в localStorage предварительно конвертирорав в формат строки
    showMessages(); // показываем наши дела 
    addMessage.value = ""; // очищаем поле инпута
 });  
 
 // пишем функцию для отображения наших дел на экран
 function showMessages (){
    let showMessage = ''; 
     todoList.forEach(function(item,i){ // перебираем наш массив и по каждому индексу используя уникальные свойства объекта создаем вёрстку
     showMessage += `
     <li>
     <img class='deleteButton' src="trash.png">
     <input type='checkbox' ${item.checked?'checked':''} id='item_${i}'>
     <label for='item_${i}'>${item.todo}<label>
     </li>
     `;
     });
     todo.innerHTML = showMessage;
 };

 //Ниже, функция дает возможность сохранить значения чекбоксов
 todo.addEventListener("change", event => { // когда нажимается чекбокс
    let numId = parseInt(event.target.getAttribute("id").replace(/\D+/g,"")); // у атрибута достаем числовое значение, это и есть индекс данного объекта в массиве
    todoList[numId].checked = !todoList[numId].checked  // меняем значение чекед на противоположное
     localStorage.setItem("todo",JSON.stringify(todoList)); // прописываем изменения в localStorage

 } );

 //Ниже, функция дает возможность удалять дела
 todo.addEventListener("click", event => { 
    if (event.target.getAttribute("class")== 'deleteButton'){ // если где произошло клик, соответсвует классу deleteButton  
        let deleteId = event.target.getAttribute("id"); // то берем значение id элемента который вызвало событие
        todoList.splice(deleteId,1); // удаляем дело по индексу который соответствует id элемента 
        localStorage.setItem("todo",JSON.stringify(todoList)); // прописываем изменения в localStorage
        showMessages(); // выводим уже обновленный список дел
    }
 });
