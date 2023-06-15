import axios from 'axios';

// const RECIPE_API_BASE_URL = "http://localhost:8080/api/recipe";

// class RecipeService {

//  getRecipe(){
//         return axios.get(RECIPE_API_BASE_URL);
//     }

// }

// export default new RecipeService;

export default axios.create({
    baseURL: 'http://localhost:8080'
})

