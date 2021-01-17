import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlightField]',
})
export class HighlightFieldDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'red';
    el.nativeElement.style.fontWeight = 'bolder';
    el.nativeElement.style.border = '2px double black';
  }
}
