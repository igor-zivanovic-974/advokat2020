import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@app/shell/global.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  isMobileScreen$: Observable<boolean>;

  constructor(private _globalService: GlobalService) {
    this.isMobileScreen$ = this._globalService.isMobileScreen$;
  }

  ngOnInit() {
    //   this.isLoading = true;
    //   this.quoteService
    //     .getRandomQuote({ category: 'dev' })
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false;
    //       })
    //     )
    //     .subscribe((quote: string) => {
    //       this.quote = quote;
    //     });.
  }
}
