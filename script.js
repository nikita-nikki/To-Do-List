document.addEventListener("DOMContentLoaded", () => {
  const todo_input = document.getElementById("todo-input");
  const todo_list = document.getElementById("todo-list");
  const addTaskBtn = document.getElementById("addTaskBtn");

  let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

  Tasks.forEach((element) => renderTasks(element));
  addTaskBtn.addEventListener("click", () => {
    const taskText = todo_input.value.trim();
    if (taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
      };
      Tasks.push(newTask);
      saveTasks();
      renderTasks(newTask);
      todo_input.value = ""; // Clear the input field after adding a task
      console.log(Tasks);
    }
  });
  function renderTasks(task) {
    console.log(task.text);
    const taskElement = document.createElement("li");
    taskElement.setAttribute("id", task.id);
    // taskElement.classList.add("todo-list-item");
    taskElement.classList.toggle("todo-list-item-deleted", task.done);
    taskElement.innerHTML = `
      <span class="todo-list-item">${task.text} <button class="delete-btn">Delete</button></span>
      
      
    `;
    taskElement.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        return;
      }
      task.done = !task.done;
      taskElement.classList.toggle("todo-list-item-deleted");
      saveTasks();
    });
    taskElement.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click event from bubbling up to the li element
      Tasks = Tasks.filter((t) => t.id !== task.id);
      taskElement.remove(); // Remove the task element from the DOM
      saveTasks();
    });
    console.log(taskElement.classList);

    todo_list.appendChild(taskElement);
  }

  function saveTasks() {
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  }
});
