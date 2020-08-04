from django.shortcuts import render

from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
 
from app.models import Ingredient
from app.serializers import IngredientSerializer
from app.models import Recipe
from app.serializers import RecipeSerializer

# Create your views here.
@api_view(['GET'])
def welcome(request):
    return JsonResponse('This is a django rest api made with love to the apicbase challenge', safe=False)


# Create your views here.
@api_view(['GET', 'POST'])
def ingredient_list(request):
    if request.method == 'GET':
        ingredients = Ingredient.objects.order_by('pk').all()        
        ingredient_serializer = IngredientSerializer(ingredients, many=True)
        return JsonResponse(ingredient_serializer.data, safe=False)
    
    elif request.method == 'POST':
        ingredient_data = JSONParser().parse(request)
        ingredient_serializer = IngredientSerializer(data=ingredient_data)
        if ingredient_serializer.is_valid():
            ingredient_serializer.save()
            return JsonResponse(ingredient_serializer.data, status=status.HTTP_200_OK) 
        return JsonResponse(ingredient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def ingredient(request, pk):
    try:
        ingredient = Ingredient.objects.get(pk=pk) 
    except Ingredient.DoesNotExist: 
        return JsonResponse({'message': 'The ingredient does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET':
        ingredient_serializer = IngredientSerializer(ingredient)
        return JsonResponse(ingredient_serializer.data)
    
    elif request.method == 'PUT':
        ingredient_data = JSONParser().parse(request) 
        ingredient_serializer = IngredientSerializer(ingredient, data=ingredient_data) 
        if ingredient_serializer.is_valid(): 
            ingredient_serializer.save() 
            return JsonResponse(ingredient_serializer.data) 
        return JsonResponse(ingredient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        ingredient.delete() 
        return JsonResponse({'message': 'Ingredient was deleted successfully!'}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def recipe_list(request):
    if request.method == 'GET':
        recipes = Recipe.objects.order_by('pk').all()        
        recipe_serializer = RecipeSerializer(recipes, many=True)
        return JsonResponse(recipe_serializer.data, safe=False)

    elif request.method == 'POST':
        recipe_data = JSONParser().parse(request)
        recipe_serializer = RecipeSerializer(data=recipe_data)
        if recipe_serializer.is_valid():
            recipe_serializer.save()
            return JsonResponse(recipe_serializer.data, status=status.HTTP_200_OK) 
        return JsonResponse(recipe_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def recipe(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk) 
    except Recipe.DoesNotExist: 
        return JsonResponse({'message': 'The Recipe does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET':
        recipe_serializer = RecipeSerializer(recipe)
        return JsonResponse(recipe_serializer.data)
    
    elif request.method == 'PUT':
        recipe_data = JSONParser().parse(request) 
        recipe_serializer = RecipeSerializer(recipe, data=recipe_data) 
        if recipe_serializer.is_valid(): 
            recipe.items.clear()
            recipe_serializer.save() 
            return JsonResponse(recipe_serializer.data) 
        
        return JsonResponse(recipe_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        recipe.items.clear()
        recipe.delete()
        return JsonResponse({'message': 'Recipe was deleted successfully!'}, status=status.HTTP_200_OK)

