import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  @Input() link: string;
  @Input() x: number;
  @Input() y: number;

  constructor() {}

  ngOnInit(): void {
    const el = document.getElementById('cntxtmnu');
    el.style.position = 'absolute';
    el.style.left = this.x + 'px';
    el.style.top = this.y + 'px';
  }
}
