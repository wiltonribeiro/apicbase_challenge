from django.db import models

# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    cost = models.DecimalField(blank=False, max_digits=5, decimal_places=2)
    description = models.TextField(blank=False, default='')
    unit = models.CharField(max_length=70, blank=False, default='')

class RecipeItem(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=False)

class Recipe(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    origin_country = models.CharField(max_length=70, blank=False, default='')
    items = models.ManyToManyField(RecipeItem)