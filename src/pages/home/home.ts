import { Component } from '@angular/core';
import { NavController , IonicPage } from 'ionic-angular';
import { Item } from './../../models/item.model';
import { Observable } from 'rxjs/Observable';

import { ShoppingListService } from '../../services/shopping-list.service';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingLists$: Observable<Item[]>;

  constructor(public navCtrl: NavController,
    private shopping : ShoppingListService) {
      this.shoppingLists$ = this.shopping
      .getShoppingList() //db list
      .snapshotChanges() // key and value
      .map( //mapear as mundas para cada vez que mudar retornar o objeto
        changes => {
          return changes.map(c => ({
          key: c.payload.key, 
          ...c.payload.val(),
          }));
      });
    }
  }
