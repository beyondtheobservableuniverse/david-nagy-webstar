import {filter, fromEvent, Observable, of, switchMap} from 'rxjs';

export abstract class FormEvent {

  protected constructor() {
    this.attachEnterKeydown(window);
  }

  abstract handleEnterKeydown(_event: Observable<KeyboardEvent>): void;

  protected attachEnterKeydown(eventSourceEl: HTMLDivElement | HTMLElement | Window): void {
    const enterKeydownEvent = fromEvent<KeyboardEvent>(eventSourceEl, 'keydown').pipe(
      filter(({key}) => key === 'Enter'), switchMap((event) => of(event)),
    );
    this.handleEnterKeydown(enterKeydownEvent);
  }

}
