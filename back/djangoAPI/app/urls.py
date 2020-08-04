from django.conf.urls import url 
from app import views 
 
urlpatterns = [ 

    # Welcome
    url(r'^$', views.welcome),

    # Ingredients
    url(r'^api/ingredients$', views.ingredient_list),
    url(r'^api/ingredients/(?P<pk>[0-9]+)$', views.ingredient),
    
    # Recipes
    url(r'^api/recipes/$', views.recipe_list),
    url(r'^api/recipes/(?P<pk>[0-9]+)$', views.recipe),
]