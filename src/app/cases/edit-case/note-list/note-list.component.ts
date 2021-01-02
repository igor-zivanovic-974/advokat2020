import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '@app/@core/interfaces/note';
import { ConfirmationModalComponent } from '@shared';
import { NoteModalComponent } from '@shared';
import { NoteService } from '@shared/modals/note-modal/note.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  @Input() notes: Note[];
  @Input() mode: string;
  @Input() caseId: number;
  @Output() changeOccured: EventEmitter<boolean> = new EventEmitter();

  constructor(private notesService: NoteService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openNoteModal(noteId?: number) {
    const modalRef = this.modalService.open(NoteModalComponent, { size: 'xl' });
    modalRef.componentInstance.caseId = this.caseId;
    if (noteId) {
      modalRef.componentInstance.noteToEdit = this.notes.find((n) => n.id === noteId);
    }
    modalRef.componentInstance.note.subscribe((receivedEntry: Note) => {
      this.notes.push(receivedEntry);
      // TODO notes not saved
      // this.changeOccured.emit(true);
    });
  }

  invokeDeleteNote(noteId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = noteId;
    modalRef.componentInstance.queryText = 'common.delete-note-query';
    modalRef.componentInstance.confirm.subscribe((response: boolean) => {
      if (response) {
        this.deleteNote(noteId);
      }
    });
  }

  deleteNote(noteId: number) {
    this.notesService
      .deleteNote(noteId)
      .pipe(take(1))
      .subscribe((note: Note) => {
        const index = this.notes.indexOf(note);
        if (index) {
          this.notes.splice(index, 1);
        }
      });
  }
}
