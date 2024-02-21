import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
 private ingredients: Ingredient[] =[
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),
  ];
  ingredientsChanged= new Subject<Ingredient[]>();

  getIngredients():Ingredient[]{
    return this.ingredients.slice();
  }
  
  AddIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  AddIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}