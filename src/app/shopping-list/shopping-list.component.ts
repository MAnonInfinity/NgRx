import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model'

// import { ShoppingListService } from './shopping-list.service'

// import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>
  private ingChangedSubs: Subscription
  
  constructor(
      // private shoppingListService: ShoppingListService,
      private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.shoppingListService.getIngredients()
    // this.ingChangedSubs = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients
    // })

  } 

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index)
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  } 

  ngOnDestroy(): void {
      // this.ingChangedSubs.unsubscribe() 
  }
}
