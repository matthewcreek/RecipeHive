package liftoff.recipehive.models;

import jakarta.persistence.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Arrays;
import java.util.List;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "TEXT")
    @Size(min=3, message="Name must be 3 characters or longer.")
    private String name;
    @Column(columnDefinition = "TEXT")
    @Size(min=5, message="Description must be 5 characters or longer.")
    private String description;

    @Column(columnDefinition = "TEXT")
    @NotEmpty(message = "Ingredients required.")
    private String ingredients;

    @Column(columnDefinition = "TEXT")
    @NotEmpty(message = "Steps required.")
    private String steps;
    private String time;

    private String recipeUserName;
    @Column(columnDefinition = "TEXT")
    public String imageUrl;
    public Recipe(){

    }

    public Recipe(String name, String description, String ingredients,
                  String steps, String time, String imageUrl, String recipeUserName) {
        this();
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.steps = steps;
        this.time = time;
        this.imageUrl = imageUrl;
        this.recipeUserName = recipeUserName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public List<String> getIngredients() {
        return Arrays.asList(ingredients.split("!#!"));
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = String.join("!#!", ingredients);
    }

    public List<String> getSteps() {
        return Arrays.asList(steps.split("!#!"));
    }

    public void setSteps(List<String> steps) {
        this.steps = String.join("!#!", steps);
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getRecipeUserName() {
        return recipeUserName;
    }

    public void setRecipeUserName(String recipeUserName) {
        this.recipeUserName = recipeUserName;
    }
}
