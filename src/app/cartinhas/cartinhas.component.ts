import { Component, OnInit } from '@angular/core';
import { Cartinha, ConfirmCartinha } from '../models/cartinha.model';
import { CartinhasService } from '../services/cartinhas.service';
import { UsersService } from '../services/users.service';

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
  constructor(private cartinhaService: CartinhasService) { }

  ngOnInit() {
    this.confirmCartinha = new ConfirmCartinha();
    this.getCartinhas();
  }

  getCartinhas() {
    this.cartinhaService.getCartinhas().subscribe((ret: any) => {
      this.cartinhas = ret.rows;
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
