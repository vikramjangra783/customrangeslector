import { Directive, HostBinding, Output, EventEmitter, ElementRef, HostListener, Input } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Position } from './position';


@Directive({
  selector: '[appMovable]'
})
export class MovableDirective {

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();
  @Input('appMovableReset') reset = false;

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    )
  }

  @HostBinding('class.draggable') draggable = true;

  @HostBinding('class.dragging') dragging = false;

  position: Position = { x: 0, y: 0 };
  private startPosition: Position;

  constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    this.dragging = true;
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }
    this.dragStart.emit(event);
   
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    if (!this.dragging) {
      return;
    }
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
    this.dragMove.emit(event);
    
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent) {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    if (this.reset) {
      this.position = {x: 0, y: 0};
    }
    this.dragEnd.emit(event);
  }



}
