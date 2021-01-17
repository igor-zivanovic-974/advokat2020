import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTest]',
})
export class TestDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = '#f00';
  }
}
