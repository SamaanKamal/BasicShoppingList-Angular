import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStorgeService } from '../shared/data-storage.service';
import { RecipeService } from "./recipe.service";

export const RecipesResolverService: ResolveFn<Recipe[]> =(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{
    const dataStorageService = inject(DataStorgeService);
    const recipeService = inject(RecipeService);
    const recipes= recipeService.getRecipes();
    if(recipes.length===0)
    {
        return dataStorageService.fetchRecipes();
    }
    else
    {
        return recipes;
    }
}

