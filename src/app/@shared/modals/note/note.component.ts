import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '@app/@core';
import { Mode } from '@app/@core/enums/mode';
import { Note } from '@app/@core/interfaces/note';
import { EmployeesService } from '@app/employees/employees.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { NoteService } from './note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() caseId: number;
  @Input() noteToEdit?: Note;
  @Output() note: EventEmitter<Note> = new EventEmitter();
  userId: number;
  form!: FormGroup;
  noteToAdd: Note;
  employee: Employee;
  mode: string;

  constructor(
    private formBuilder: FormBuilder,
    private notesService: NoteService,
    private activeModal: NgbActiveModal,
    private employeesService: EmployeesService) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.noteToEdit) {
      this.mode = Mode.update;
      // console.log('noteToEdit', this.noteToEdit);
      // this.form.value = this.noteToEdit;
      this.form.patchValue({ text: this.noteToEdit.text })
    } else {
      this.mode = Mode.create;
      this.userId = +localStorage.getItem('currentUserId') || 1;
      this.getEmployee();
    }

  }

  getEmployee() {
    this.employeesService.getEmployeeById(this.userId).pipe(take(1)).subscribe((e: Employee) => {
      this.employee = e;
    })
  }

  addNote() {
    this.noteToAdd = {
      id: null,
      text: this.form.value.text,
      date: new Date(),
      employee: this.employee,
      caseId: this.caseId
    };

    this.notesService.addNote(this.noteToAdd).pipe(take(1)).subscribe((note: Note) => {
      this.note.emit(this.noteToAdd);
    })
    this.activeModal.close();
  }

  updateNote() {
    this.noteToEdit.text = this.form.value.text;
    this.notesService.editNote(this.noteToEdit).pipe(take(1)).subscribe((note: Note) => {
      this.note.emit(this.noteToEdit);
    });
    this.activeModal.close();
  }

  save() {
    if (this.mode === Mode.create) {
      this.addNote();
    } else {
      this.updateNote();
    }
  }

  cancel() {
    this.activeModal.close();
  }

  createForm() {
    this.form = this.formBuilder.group({
      // id: [null],
      text: ['', Validators.required],
      // date: ['', Validators.required],
      // userId: [null],
      // caseId: [null],
    });
  }
}
