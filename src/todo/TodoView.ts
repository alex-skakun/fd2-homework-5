import { DisposableView } from '../types';
import { TodoModel } from './TodoModel';


export class TodoView implements DisposableView {
  item: any;
  buttonGroup: any;
  nameSpan: any;
  addButton: any;
  doneButton: any;
  deleteButton: any;
  createView: (() => void) | undefined;
  initModel: (() => void) | undefined;
  addEventListener: (() => void) | undefined;
  append: (() => void) | undefined;



  render(parentElement: HTMLElement): () => void {

    this.createView(): void | undefined {
      this.item = document.createElement('div') as HTMLDivElement;         //создаем див
      this.buttonGroup = document.createElement('div') as HTMLDivElement;  //создаем див для кнопок
      this.nameSpan = document.createElement('span') as HTMLSpanElement;       //спан для текста задачи
      this.doneButton = document.createElement('button') as HTMLButtonElement;  //кнопка выполнения
      this.deleteButton = document.createElement('button') as HTMLButtonElement; //кнопка удаления
      this.addButton = document.createElement('button') as HTMLButtonElement; //кнопка добавления

      this.nameSpan.textContent = '';

      this.item.classlist.add('list-item');             //классы для стилей
      this.buttonGroup.classlist.add('btn-group');
      this.doneButton.classlist.add('btn-success');
      this.doneButton.textContent = 'Выполнено';
      this.deleteButton.classlist.add('btn-danger');
      this.deleteButton.textContent = 'Удалить';
      this.addButton.textContent = 'Добавить';
    }


    this.initModel(): void | undefined {
      // БД
    }



    this.addEventListener(): void | undefined  {

      this.addButton.addEventListener('click', () => {    //по клику удаляем задачу
        model.add();

      });

      this.doneButton.addEventListener('click', () => {    //состояние выполнения задачи
        model.done = !model.done;
      });

      this.deleteButton.addEventListener('click', () => {    //по клику удаляем задачу
        if (confirm('Вы уверены?')) {
          model.delete();
        }
      });
    }




    this.append(parentElement: HTMLElement): void | undefined  {

      this.buttonGroup.append(this.doneButton);
      this.buttonGroup.append(this.deleteButton);
      this.item.append(this.nameSpan);
      this.item.append(this.buttonGroup);          //добавление в див спанa с задачей и кнопок

      parentElement.append(this.item);             //див с задачей добавляем в боди
    }







    return function () {

      this.removeView(): void | undefined  {

        this.item.remove();
        this.buttonGroup.remove();
        this.nameSpan.remove();
        this.doneButton.remove();
        this.deleteButton.remove();
        this.addButton.remove();
      }


      this.removeModel(): void | undefined {
        // БД - закрыть
      }


      this.removeAddEventListener(): void | undefined  {

      }



      this.removeParentElement(parentElement: HTMLElement): void | undefined  {

        this.buttonGroup.remove();
        this.buttonGroup.remove();
        this.item.append.remove();
        this.item.append.remove();

        parentElement.remove();
      }




    }

  }

}


const model = new TodoModel();