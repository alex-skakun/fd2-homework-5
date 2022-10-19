import { DisposableView } from '../types';
import {appState, TodoStructure} from "./TodoModel";

export  class TodoList {
  constructor(
      private  todoItems: TodoStructure[],
      private  type: 'Pending' | 'Finished'
  ) {
    this.display();
    console.log(this.type);
  }

  private  display() {
    document.querySelector('ul')!.innerText = '';
    for (let todo of this.todoItems) {
      new TodoItem(todo.id, todo.input, this.todoItems);
    }
  }
}

export class TodoItem {
  tempElement: HTMLTemplateElement;
  ulElement: HTMLUListElement;
  liElement: HTMLLIElement;

  constructor(
      private  id: string,
      private input: string,
      private  todoItems: TodoStructure[]
  ) {
    this.tempElement = document.querySelector('template')!;
    this.ulElement = document.querySelector('ul')! as HTMLUListElement;

    const importedHtml = document.importNode(this.tempElement.content, true);

    this.liElement = importedHtml.firstElementChild as HTMLLIElement;

    this.attach();
    this.display();
    this.deleteTodo();
    this.editTodo();
  }

  private  attach() {
    console.log(this.todoItems, this.liElement, this.ulElement);
    this.ulElement.insertAdjacentElement('afterbegin', this.liElement);
  }

  private display() {
    this.ulElement.querySelector('h1')!.textContent = this.input;
    this.ulElement.querySelector('.del')!.id = this.id;
    this.ulElement.querySelector('.edit')!.id = this.id;
  }

  private deleteItem(id: string, todoItems: TodoStructure[]) {
    const  removedTodo = todoItems.filter((todo) => todo.id !== id);
    appState.Todos = removedTodo;
  }

  private deleteHandler () {
    if (document.querySelector('input')!.value) {
      alert('Todo already selected!');
      return;
    }

    const id = this.id.toString();
    const todoItems = [...appState.Todos];
    this.deleteItem(id, todoItems);
  }

  private  editHandler() {
    if (document.querySelector('input')!.value) {
      alert('Todo already selected!');
      return;
    }

    const id = this.id.toString();
    const todoItems = [...appState.Todos];
    const getText = todoItems.find((todo) => todo.id === id)!;

    document.querySelector('input')!.value = getText.input;
    this.deleteItem(id, todoItems)
  }

  private  deleteTodo() {
    this.liElement.querySelector('.del')!.addEventListener('click', this.deleteHandler.bind(this));
  }

  private  editTodo() {
    this.liElement.querySelector('.edit')!.addEventListener('click', this.editHandler.bind(this));
  }
}


export class TodoView implements DisposableView {

  render(parentElement: HTMLElement): () => void {
    return function () {};
  }

}
