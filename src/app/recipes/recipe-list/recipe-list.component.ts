import { Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  recipes: Recipe[];

  constructor(private recipeService:RecipeService, private router:Router){}

  ngOnInit(): void {
    this.subscription=this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[])=>{
        this.recipes=recipes;
      }
    )
    this.recipes=this.recipeService.getRecipes();
  }
  
  onNewRecipe(){
    this.router.navigate(['/recipes/new']);
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }
}
