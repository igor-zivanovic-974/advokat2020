import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteModalComponent } from '@app/@shared/modals/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '@app/@core/services/helper.service';
import { Client } from '@app/@core/interfaces/client';
import { GlobalService } from '@app/shell/global.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  searchValue = '';
  selectedClient: Client = {
    id: null,
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    pin: '',
    cases: [{ id: 1, name: 'Pera protiv Sime' }],
  };
  selectedClientId: number; // Client; // (null, '', '', '', '', '');
  modalState: boolean;
  clients: Client[] = [];
  filteredClients: Client[] = [];
  isMobileScreen$: Observable<boolean>;
  // hasSideMenu$: Observable<boolean>;
  link = 'clients';

  constructor(
    private clientsService: ClientsService,
    private translateService: TranslateService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private helperService: HelperService,
    private _globalService: GlobalService
  ) {
    this.isMobileScreen$ = this._globalService.isMobileScreen$;
    // this.hasSideMenu$ = this._globalService.hasSideMenu$;
  }

  ngOnInit() {
    this.spinner.show();
    this.getClients();
    this._globalService.calcMessagesNumber(1);
    this._globalService.hasMessages$.next(true);
  }

  getClients() {
    this.clientsService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.filteredClients = data;
      this.spinner.hide();
    });
    // this.clients = this.helperService.getClients();
    console.log(this.clients);
    this.spinner.hide();
  }

  goToUrl(mode: string, clientId?: number) {
    if (mode !== 'new') {
      this.router.navigate([`${this.link}/${mode}/${clientId}`]);
    } else {
      this.router.navigate([`${this.link}/${mode}`]);
    }
  }

  // showClientDetails(cId: number) {
  //   this.activeClient = this.clients.find(c => c.id === cId);
  // }

  invokeDeleteClient(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.confirm.subscribe((res: any) => {
      // console.log('confirmed for deletion');
      if (res) {
        this.delete(id);
      }
    });
  }

  delete(id: number) {
    this.clientsService.deleteClient(id).subscribe((x: any) => {
      this.getClients();
    });
  }

  searchClients() {
    setTimeout(() => {
      this.searchValue = this.searchValue.trim();
      this.filteredClients = this.clients.filter((c) => {
        return (
          c.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          c.lastName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          c.phone.includes(this.searchValue) ||
          c.address.includes(this.searchValue.toLowerCase())
        );
      });
    }, 500);

  }

  setActiveClient(c: Client) {
    this.selectedClientId = c.id;
    this.selectedClient = c;
    // console.log(this.selectedClient);
  }
}
