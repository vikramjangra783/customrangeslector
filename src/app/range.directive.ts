import { Directive, ElementRef } from '@angular/core';
import { MovableDirective } from './app-movable.directive';

@Directive({
  selector: '[appRange]'
})
export class RangeDirective {

  constructor(private element: ElementRef) { }

  adjustRange(movable: MovableDirective) {
    (this.element.nativeElement as HTMLElement).style.width = `${movable.position.x + 10}px`;
    (this.element.nativeElement as HTMLElement).style.height = `${Math.abs(movable.position.y) + 10}px`;
    console.log((this.element.nativeElement as HTMLElement).style.height);
    console.log((this.element.nativeElement as HTMLElement).style.width);
  }

}
