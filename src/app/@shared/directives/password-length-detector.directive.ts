import { Directive, ElementRef, OnChanges, HostListener } from '@angular/core';

@Directive({
  selector: '[appPasswordLengthDetector]',
})
export class PasswordLengthDetectorDirective implements OnChanges {
  //

  constructor(private el: ElementRef) {
    console.log(el.nativeElement.value.length);
    // el.nativeElement.style.border = 'solid 3px red';
  }

  // Listen for keyup event and change background color
  @HostListener('window:keyup') ngOnChanges(event: any) {
    const count = this.el.nativeElement.value.length;
    console.log(this.el.nativeElement.value.length);
    if (count < 3) {
      this.el.nativeElement.style.backgroundColor = 'ff8585';
    } else if (count >= 3 && count <= 8) {
      this.el.nativeElement.style.backgroundColor = 'c6ebc9';
    } else if (count > 8) {
      this.el.nativeElement.style.backgroundColor = 'c6ebc9';
    }
  }
}
