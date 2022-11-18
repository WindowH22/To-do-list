const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput= toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

    const TODOS_LS = "toDos";

    let toDos = [];

    function deleteToDo(event){
        const btn = event.target;
        const li = btn.parentNode;
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanToDos;
        saveToDos();
    }

    function checkToDos(){
      
        const btn = event.target;
        const li = btn.parentNode;
        
        
        console.log(li);
        console.log(li.children);
        console.log(li.querySelector('span').style.textDecorationLine === "line-through");
        
        if(li.querySelector('span').style.textDecorationLine === "line-through"){
            li.querySelector('span').style.textDecorationLine = '';
        } else {
            li.querySelector('span').style.textDecorationLine = "line-through"
        }
    
    }

    function saveToDos() {
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    }

    function paintToDo(text){
       const li =document.createElement("li");      
       const checkBtn = document.createElement("button");      
       const delBtn = document.createElement("button");
       const span = document.createElement("span");
       const newId = toDos.length + 1;
       delBtn.innerText = "❌" ;
       delBtn.addEventListener("click",deleteToDo);       
       checkBtn.innerText = "✅";
       checkBtn.addEventListener("click",checkToDos);
       span.innerText = text;
       
       li.appendChild(checkBtn);
       li.appendChild(delBtn);
       li.appendChild(span);
       
       li.id =newId;
       toDoList.appendChild(li);
       const toDoObj ={
           text: text,
           id: newId
       };
       toDos.push(toDoObj);
       saveToDos()
    }

    function handleSubmit(event){
        event.preventDefault();
        const currentValue =toDoInput.value;
        paintToDo(currentValue);
        toDoInput.value = "";
    }

    function loadToDos(){
        const loadedToDos = localStorage.getItem(TODOS_LS)
        if(loadedToDos !== null){
            console.log(loadedToDos)
         const parsedToDos = JSON.parse(loadedToDos)  
         parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
         })   
        }
    }

    function init(){
        loadToDos();
        toDoForm.addEventListener("submit",handleSubmit)
    }

    init();