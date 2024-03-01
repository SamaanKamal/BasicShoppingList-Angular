import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
    providedIn:'root'
})
export class DataStorgeService {
    constructor(private http:HttpClient,private recipeService:RecipeService){}

    storeRecipes(){
        const recipes =this.recipeService.getRecipes();
        this.http.put('https://recipesandshoppinglist-d3dde-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(
            (response) =>{
                console.log(response);
            }
        );
    }

    fetchRecipes(){
        this.http.get<Recipe[]>('https://recipesandshoppinglist-d3dde-default-rtdb.firebaseio.com/recipes.json').pipe(
            map((recipes)=>{
                return recipes.map((recipe)=>{
                    return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients:[]};
            });
            })
        ).subscribe(
            (recipes) =>{
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}