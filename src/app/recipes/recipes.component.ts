import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  selectedRecipeElement!:Recipe;
  onPassing(recipe:Recipe){
    this.selectedRecipeElement=recipe;
  }
}
