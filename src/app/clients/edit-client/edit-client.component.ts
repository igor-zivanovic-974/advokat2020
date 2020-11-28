import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Client } from '@app/@core/interfaces/client';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
// import { HelperService } from '@app/@core/services/helper.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  client: Client;
  id: string;
  mode: string;
  param = { value: 'world' };

  constructor(
    private clientsService: ClientsService,
    private translateService: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private modalService: NgbModal,
    private spinner: NgxSpinnerService // private helperService: HelperService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.params.subscribe((params: any) => {
      // tslint:disable-next-line:no-string-literal
      this.id = params['id'];
      if (this.id === 'new') {
        this.mode = 'new';
        this.spinner.hide();
      } else {
        this.mode = 'update';
        this.getClient(this.id);
        console.log(this.mode);
      }
    });
  }

  getClient(id: string) {
    this.clientsService.getClientById(id).subscribe((data: Client) => (this.client = data));
    this.spinner.hide();
  }

  goToUrl() {
    this.router.navigate(['clients']);
  }

  save() {
    this.spinner.show();
    if (this.mode === 'new') {
      this.clientsService.createClient(this.client).subscribe((data: Client) => {
        this.goToUrl();
      });
    } else {
      this.clientsService.updateClient(this.client).subscribe((data: Client) => {
        this.goToUrl();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
