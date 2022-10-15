import { DisposableView } from '../types';


export class TodoView implements DisposableView {

  render(parentElement: HTMLElement): () => void {
    return function () {};
  }

}
