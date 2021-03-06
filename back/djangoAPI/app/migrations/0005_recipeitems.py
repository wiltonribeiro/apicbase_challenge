# Generated by Django 3.0.9 on 2020-08-04 00:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20200803_1920'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecipeItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Recipe')),
                ('recipe_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.RecipeItem')),
            ],
        ),
    ]
