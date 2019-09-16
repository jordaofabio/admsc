import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  currentRoute: string;
  @Input() activePage: number;
  @Input() totalItens: number;
  @Input() itensPage: number;

  next = 0;
  prev = 0;
  totalPages: number;
  numbers: number[] = [];
  quantityDefault = 10;
  concatQuantity = '';

  constructor(private location: Location) {
    
  }

  ngOnInit() {
    debugger
    this.activePage = !this.activePage ? 1 : this.activePage;
    this.itensPage = !this.itensPage ? this.quantityDefault : this.itensPage;
    this.currentRoute = this.location.path().indexOf('/page/') > -1 ? this.location.path().split('/page/')[0] : this.location.path();
    this.concatQuantity = this.itensPage !== this.quantityDefault ? `/quantity/${this.itensPage}` : '';
    this.setNumbers();
    this.setNextPrev();
  }

  setNextPrev() {
    this.next = this.totalPages > this.activePage ? this.activePage + 1 : 0;
    this.prev = this.activePage > 1 ? this.activePage - 1 : 0;
  }

  setNumbers() {
    if (this.totalItens > this.itensPage) {
      this.totalPages = this.totalItens / this.itensPage;
      for (let p = 1; p <= Math.round(this.totalPages); p++) {
        this.numbers.push(p);
      }
    }
  }

}
