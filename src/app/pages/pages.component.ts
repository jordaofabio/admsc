import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/pages.service';
import { Page, ConfirmPage } from '../models/page.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  pages: Page[];
  confirmPage: ConfirmPage;
  hideModal = true;
  constructor(private pageService: PagesService) { }

  ngOnInit() {
    this.confirmPage = new ConfirmPage();
    this.getPages();
  }

  getPages() {
    this.pageService.getPages().subscribe((ret: any) => {
      this.pages = ret;
    });
  }

  Confirm(page: ConfirmPage) {
    this.hideModal = false;
    this.confirmPage = page;
  }

  deletePage() {
    this.pageService.deletePage(this.confirmPage.id).subscribe(
      (ret: any) => {
        this.hideModal = true;
        this.pages.splice(this.pages.findIndex(x => x.id === this.confirmPage.id), 1);
      }
    );
  }

}
