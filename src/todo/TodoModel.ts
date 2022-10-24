import { TodoView } from "./TodoView";


export class TodoModel {


    _name = '';       //для set
    _done = false;    //для set

    constructor(name = '', done = false) {

        this.name = name;
        this.done = done;

    }


    add() {
        let note = prompt('Добавьте задачу');
        view.nameSpan.textContent = note;
    }




    set name(value: string) {            //здесь текст задачи перезаписывается в спане
        this._name = value;
        view.nameSpan.textContent = value;
    }

    get name() {
        return this._name;    //чтобы значение можно было еще и получать
    }




    set done(value: boolean) {
        this._done = value;

        if (value) {
            view.item.classList.add('list-group-item-success');  //добавить классс для переключения состояния
        } else {
            view.item.classList.remove('list-group-item-success');
        }


    }

    get done() {
        return this._done;
    }




    delete() {
        view.item.remove();   //удаление задачи - это див созданный

    }


}


let todoModel = new TodoModel('текст задачи', true);
let view = new TodoView();