 //=============
    // 2.2.3 You must create an already existing tasks list, and define what attributes a task should have for example:
    // · Title
    // · Description
    // · Due Date
    // · Priority (high, medium, low)
    // 2.2.4. Create variables to store your dashboard data and put these in an array. Write a function to render the tasks and use DOM manipulation methods to create HTML elements for each task dynamically. Invoke these tasks and call them when the dashboard loads to display existing tasks.
    //=============

    // =======STEP 1=======
    //Create an array called "todos" and for each array item, create a variable and value for "priority", "done" and "todo"
    //rename the original todos array to defaultTodos
    let defaultTodos = [
        {priority: "bg-red", done: "checked", todo: "Collect Peppie from Day Care"},
        {priority: "bg-red", done: "", todo: "Go to Gym"},
        {priority: "bg-orange", done: "checked", todo: "Phone Mom for chat"},
        {priority: "bg-gold", done: "", todo: "Clean the pool"},
        {priority: "bg-gold", done: "checked", todo: "Do all my ICE Tasks"}
    ];

    //create the empty array
    let todos = [];

    //assign the DOM id item todoContainer to the variable todoBox
    let todoBox = document.getElementById("todoContainer");
    
    // =======STEP 2=======
    //run a loop that tests for array length and writes each array item into html
    for(let i = 0; i < todos.length; i++){
        todoBox.innerHTML += `
            <div class="to-do-row">
                <div class="circle ${todos[i].priority}"></div>
                <input type="checkbox" ${todos[i].done}>
                <div class="to-do-item bg-light">${todos[i].todo}</div>
                <i class="fa fa-pencil-alt icon"></i>
                <i class="fa fa-trash-alt icon"></i>
            </div>
            `;
    }

    // =======STEP 3=======

    //COMMENTED OUT IN STEP 6 BELOW
    // Convert the todos array to strings (text) for storage using JSON
    //let todosJSON = JSON.stringify(todos);

    //Save the above to local storage
    //localStorage.setItem("todos", todosJSON);

    //At this point, if you open your browser's DevTools (inspect) - go to Application > Local Storage > click on todos, you should see your stored data.

    // =======STEP 4=======
    //CREATE A FUNCTION THAT IS RUN WHEN THE PLUS ICON IS CLICKED THAT CHECKS IF THERE IS ANY INPUT AND RETURNS ERROR MESSAGES IF INPUT IS MISSING. AND READS THE INPUT VALUES IF THERE IS INPUT.

    // Create the function that tests whether something was added
    // If nothing is entered when the plus is clicked, show first alert, if something entered show second alert
    // If no priority radio button is chosen, say "No priority chosen!", if was chosen, say "You Chose.."

    //add this for when we deal with the edit todo item
    // keeps track of the todo being edited
    let editIndex = null; 

    function plusClicked() {
        // Get the input field
        const inputField = document.querySelector(".input-text");
        // Trim off any spaces
        const newtodo = inputField.value.trim();

        // Get the selected radio
        const selected = document.querySelector('input[name="priority"]:checked');
        // If no priority is selected, set value to ""
        // This is a shorthand if else statement. condition ? valueIfTrue : valueIfFalse
        // It is saying, if an item is selected, set the variable value to whatever was selected, else set the value to an empty string.
        const newpriority = selected ? selected.value : "";

        //A series of if else statements testing if the user has entered something into the todo field and chosen a priority.
        if (newtodo === "" && newpriority === "") {
            alert("You Must Enter a To-Do Item and select a priority!");
            // return will stop the function from proceeding
            return;
        } 
        else if (newtodo === "") {
            alert("You Must Enter a To-Do Item!");
            // return will stop the function from proceeding
            return;
        } 
        else if (newpriority === "") {
            alert("You Must Select a Priority!");
            // return will stop the function from proceeding
            return;
        } 
        //if the user entered a todo and chose a priority, then show this in an alert.
        // else {
        //     alert(newtodo + " (" + newpriority + ")");
        // }

    //=======STEP 5=======
    //ADD THE NEW TODO TO THE ARRAY
    //UPDATE THE HTML TO APPEND THE NEW ITEM
    //CLEAR THE ADD ITEM INPUTS

        if (editIndex !== null) {
            // Editing an existing todo
            todos[editIndex].todo = newtodo;
            todos[editIndex].priority = newpriority;
            editIndex = null; // reset edit mode
        }
        else {
            // Adding a new todo
            todos.push({
                todo: newtodo,
                priority: newpriority,
                done: "" // new items start unchecked
            });
        }

        //  Update the HTML
        let todobox = document.getElementById("todoContainer");
        
        // Append the new item
        todobox.innerHTML += `
            <div class="to-do-row">
                <div class="circle ${newpriority}"></div>
                <input type="checkbox">
                <div class="to-do-item bg-light">${newtodo}</div>
                <i class="fa fa-pencil-alt icon"></i>
                <i class="fa fa-trash-alt icon"></i>
            </div>
        `;

        // Re-render all todos (this attaches delete/checkbox listeners)
        renderTodos();

        // Clear the input and radio selection
        inputField.value = "";
        if (selected) selected.checked = false;

    //BUT IF YOU CHECK YOUR JSON STORAGE IN YOUR BROWSER DEVTOOLS, IT IS NOT STORING THE NEWLY APPENDED ITEM
    //WHEN YOU REFRESH THE PAGE, THE NEW ITEMS ARE GONE.

    //=======STEP 6=======

    // MOVE THE BELOW HERE SO THAT ONLY STUFF GETS STORED IF THE FUNCTION RUNS

            // Convert the todos array to JSON text
            let todosJSON = JSON.stringify(todos);

            // Save it in localStorage
            localStorage.setItem("todos", todosJSON); 
    //TEST IN YOUR BROWSER AND SEE THAT THE NEW ITEM IS BEING STORED
    //BUT WHEN THE PAGE IS RELOADED, THE STORED ITEMS ARE NOT BEING WRITTEN. THE HARD CODED ARRAY IS ALL THAT IS WRITTEN

    }

    // ====== Step 7=======
    // When the page reloads
    window.addEventListener("DOMContentLoaded", () => {
        //set a variable "storedTodos" and go get the todos item from local storage and assign this to the variable
        const storedTodos = localStorage.getItem("todos");
        //test if there is a stored item called "todos" and if yes, run the code within
        //this code with write the defaultTodos array if there are no stored items
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
            // If the stored array is empty, use default todos
            if (todos.length === 0) {
                todos = [...defaultTodos];
            }
        } 
        else {
            // If nothing in localStorage, use default todos
            todos = [...defaultTodos];
        }

        // run this function to write all the todos
        renderTodos();
    });

    //=======STEP 8=======
    //Render todos from the array that was retrieved when the page loaded
    //This function will be run when called from the page load function above
    function renderTodos() {
        const todobox = document.getElementById("todoContainer");
        todobox.innerHTML = "";

        // build all todos
        todos.forEach(todo => {
            todobox.innerHTML += `
                <div class="to-do-row">
                    <div class="circle ${todo.priority}"></div>
                    <input type="checkbox" ${todo.done}>
                    <div class="to-do-item bg-light">${todo.todo}</div>
                    <i class="fa fa-pencil-alt icon"></i>
                    <i class="fa fa-trash-alt icon"></i>
                </div>
            `;
        });

        // now attach listeners to checkboxes
        const checkboxes = todobox.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener("change", () => {
                todos[index].done = checkbox.checked ? "checked" : "";
                localStorage.setItem("todos", JSON.stringify(todos));
            });
        });

        // now attach listeners to delete buttons
        const deleteBtns = todobox.querySelectorAll(".fa-trash-alt");
        deleteBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                todos.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(todos));
                renderTodos(); // re-render after deleting
            });
        });

        // edit listeners
        const editBtns = todobox.querySelectorAll(".fa-pencil-alt");
        editBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                editIndex = index;
                document.querySelector(".input-text").value = todos[index].todo;
                document.querySelectorAll('input[name="priority"]').forEach(r => {
                    r.checked = r.value === todos[index].priority;
                });
            });
        });
    }


    //COMING SOON

    function comingSoon(){
        document.getElementById("comingSoon").style.display = "flex";
    }

    function closeWarning(){
        document.getElementById("comingSoon").style.display = "none";
    }