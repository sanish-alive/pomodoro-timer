import { useState } from "react";

function ToDo() {
    const [inputTask, setInputTask] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [id, setId] = useState(0);

    const handleAddTodo = () => {
        const newTask = {
            id: id,
            detail: inputTask,
            completed: false
        };
        setId(id+1);
        setTodoList([...todoList, newTask]);
        setInputTask("");
    };

    const handleCompleteTodo = (e, todoId) => {
        const updatedTodos = todoList.map((todo) => {
            if(todo.id === todoId) {
                return { ...todo, completed: true};
            }
            return todo;
        });
        setTodoList(updatedTodos);
        e.target.style.display = 'none';
    };

    const handleDeleteTodo = (id) => {
        const newList = todoList.filter((todo) => todo.id !== id);
        setTodoList(newList);
    };

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>

            <div className="todo-input">
                <input className="input" type="text" value={inputTask}
                onChange={(e) => setInputTask(e.target.value)} />
                <button className="todo-btn" onClick={handleAddTodo}>
                <i class="fas fa-plus"></i>
                </button>
            </div>

            <div className="todo-detail">
                <ol>
                    {todoList.map((todo) => (
                        <li key={todo.id}>
                            <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                                {todo.detail}
                            </span>
                            <i class="fas fa-times" id="delete" onClick = {() => handleDeleteTodo(todo.id)}></i>
                            <i class="fas fa-check" id="check" onClick = {(e) => handleCompleteTodo(e, todo.id)}></i>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default ToDo;