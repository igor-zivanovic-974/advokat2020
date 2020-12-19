import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyValuePair } from '@app/@core/interfaces/keyValuePair';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() label: string;
  @Input() readonly: boolean;
  @Input() items: KeyValuePair[];
  @Input() selectedItemId: number;
  // @Output() changedItem: EventEmitter<KeyValuePair> = new EventEmitter();
  @Output() changedItem: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onValueChange() {
    // debugger
    // const item: KeyValuePair = this.items.find(x => x.id === this.selectedItemId);
    // console.log('item', item);
    this.changedItem.emit(this.selectedItemId);
  }
}
