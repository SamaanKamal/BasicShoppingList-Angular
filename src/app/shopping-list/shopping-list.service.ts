import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
 private ingredients: Ingredient[] =[
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),
  ];
  ingredientsChanged= new EventEmitter<Ingredient[]>();

  getIngredients():Ingredient[]{
    return this.ingredients.slice();
  }
  
  AddIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}