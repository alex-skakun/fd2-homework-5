import {TodoList, TodoView} from "./TodoView";

export class TodoModel {
    todoInput: HTMLInputElement;
    submitButton: HTMLButtonElement;

    constructor() {
        this.todoInput = document.querySelector('input')! as HTMLInputElement;
        this.submitButton = document.querySelector('.addTodo')! as HTMLButtonElement;
        this.submit();
    }

    private submitHandler(e: Event) {
        e.preventDefault();
        console.log('event');
        const getTodoValue = this.todoInput.value;
        const ValidatedText = this.validation(getTodoValue);
        if(ValidatedText) {
            const  id = Math.random().toString();
            appState.addTodo(id, ValidatedText, 'Pending');
            this.clearFormInput();
        } else {
            this.clearFormInput();
        }
    }

    private submit() {
        console.log(this.submitButton, this.todoInput)
        this.submitButton.addEventListener('click', this.submitHandler.bind(this));
    }

    private clearFormInput() {
        this.todoInput.value = '';
    }

    private  validation(value: string): string | undefined {
        const checkInput = validate({
            text: value,
            min: 3,
        });
        if (!checkInput) {
            alert('Неправильный ввод!');
            return;
        }
        return  value;
    }
}

export class TodoStructure {
    constructor(public id: dType, public input: dType, public status: string) {}
}

export class AppState {
    protected  todos: TodoStructure[];
    private static instance: AppState;

    protected constructor() {
        this.todos = [];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AppState();
        return this.instance;
    }

    protected  getTodoList() {
        new TodoList(this.todos, 'Pending');
        new TodoList(this.todos, 'Finished')
    }

    addTodo(id: string, input: string, status: string) {
        const todoItem = new  TodoStructure(id, input,status);
        this.todos.push(todoItem);
        this.getTodoList();
    }

    set Todos(todoItems: TodoStructure[]) {
        this.todos = [...todoItems];
        this.getTodoList();
    }

    get Todos() {
        return this.todos;
    }
}

export const todoModel = new TodoModel();
export const appState = AppState.getInstance();


type  dType = string;

interface  TodoInputValidation {
    text: dType;
    min?: number;
}

function  validate(todo: TodoInputValidation) {
    let isValid = true;
    if (todo.min && todo.text.length < todo.min) {
        isValid = false;
    }
    return isValid;
}
