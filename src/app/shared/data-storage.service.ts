import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

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
        this.http.get('https://recipesandshoppinglist-d3dde-default-rtdb.firebaseio.com/recipes.json').subscribe(
            (recipes) =>{
                
            }
        );
    }
}