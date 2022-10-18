import {TodoView} from "./TodoView";

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
    }

    private submit() {
        console.log(this.submitButton, this.todoInput)
        this.submitButton.addEventListener('click', this.submitHandler.bind(this));
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

const todoModel = new TodoModel();

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
