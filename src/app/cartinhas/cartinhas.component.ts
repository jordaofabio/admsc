import { Component, OnInit } from '@angular/core';
import { Cartinha, ConfirmCartinha } from '../models/cartinha.model';
import { CartinhasService } from '../services/cartinhas.service';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cartinhas',
  templateUrl: './cartinhas.component.html',
  styleUrls: ['./cartinhas.component.scss']
})
export class CartinhasComponent implements OnInit {

  activeUser = UsersService.activeUser;
  cartinhas: Cartinha[];
  confirmCartinha: ConfirmCartinha;
  hideModal = true;
  page: number;
  quantity: number;
  totalItens: number;

  constructor(
    private route: ActivatedRoute,
    private cartinhaService: CartinhasService
    ) { }

  ngOnInit() {
    this.page = !this.route.snapshot.paramMap.get('page') ? 1 : parseInt(this.route.snapshot.paramMap.get('page'), 10);
    this.quantity = !this.route.snapshot.paramMap.get('quantity') ? 10 : parseInt(this.route.snapshot.paramMap.get('quantity'), 10);
    this.confirmCartinha = new ConfirmCartinha();
    this.getCartinhas(this.page);
  }

  getCartinhas(page: number) {
    this.cartinhaService.getCartinhas(page, this.quantity).subscribe((ret: any) => {
      this.cartinhas = ret.rows;
      this.totalItens = ret.count;
    });
  }


  Confirm(cartinha: Cartinha) {
    this.hideModal = false;
    this.confirmCartinha = new ConfirmCartinha();
    this.confirmCartinha = {
      id: cartinha.id,
      crianca: cartinha.crianca
    };
  }

  deleteCartinha() {
    this.cartinhaService.deleteCartinha(this.confirmCartinha.id).subscribe(
      (ret: any) => {
        this.hideModal = true;
        this.cartinhas.splice(this.cartinhas.findIndex(x => x.id === this.confirmCartinha.id), 1);
      }
    );
  }
}
