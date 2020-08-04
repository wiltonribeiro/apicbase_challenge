import RecipesRepository from './RecipesRepository';
import IngredientsRepository from './IngredientsRepository';

const repositories = {
    recipe: RecipesRepository,
    ingredient: IngredientsRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
