const { getData } = require("../utils/getData");
const { setData } = require("../utils/setData");
const crypto = require("crypto");

let data = getData();

exports.getAllRecipes = (req, res) => {
  let recipes = [...data];

  const searchTerm = req.query?.title?.trim()?.toLowerCase();

  const order = req.query.order;

  if (searchTerm) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchTerm)
    );
  }

  if (order) {
    recipes.sort((a, b) =>
      order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  res.status(200).json({
    message: "Tarifler başarıyla gönderildi",
    results: recipes.length,
    recipes: recipes,
  });
};

exports.createRecipe = (req, res) => {
  const newRecipe = req.body;

  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({ message: "Lütfen bütün değerli tanımlayın" });
  }

  newRecipe.id = crypto.randomUUID();

  data.push(newRecipe);

  setData(data);

  res.status(200).json({ message: "Yeni tarif oluşturuldu", recipe: data });
};

exports.getRecipe = (req, res) => {
  res.status(200).json({
    message: "Aradığınız tarif bulundu",
    recipe: req.recipe,
  });
};

exports.deleteRecipe = (req, res) => {
  const index = data.findIndex((i) => i.id == req.params.id);

  data.splice(index, 1);

  setData(data);

  res.status(204).json({ message: "Başarıyla Silindi" });
};
