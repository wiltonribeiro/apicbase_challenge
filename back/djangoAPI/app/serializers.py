from rest_framework import serializers 
from app.models import Ingredient
from app.models import RecipeItem
from app.models import Recipe
 
 
class IngredientSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Ingredient
        fields = ('id',
                  'name',
                  'unit',
                  'description',
                  'cost')

class IngredientWithIDSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField()
 
    class Meta:
        model = Ingredient
        fields = ('id',
                  'name',
                  'unit',
                  'description',
                  'cost')


class RecipeItemSerializer(serializers.ModelSerializer):

    ingredient = IngredientWithIDSerializer()

    class Meta:
        model = RecipeItem
        fields = ('id',
                  'ingredient',
                  'quantity')

class RecipeSerializer(serializers.ModelSerializer):

    items = RecipeItemSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ('id',
                  'name',
                  'origin_country',
                  'items')

    def create(self, validated_data):
        items = validated_data.pop("items")
        instance = Recipe.objects.create(**validated_data)

        recipe_items = []
        for item in items:
            qtd = item['quantity']
            ingredient_id = item['ingredient']['id']
            ingredient = Ingredient.objects.get(pk=ingredient_id)

            recipe_item = RecipeItem(ingredient=ingredient, quantity=qtd)
            recipe_item.save()
            
            instance.items.add(recipe_item)

        return Recipe.objects.get(pk=instance.pk)
