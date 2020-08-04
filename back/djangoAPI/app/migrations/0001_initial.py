# Generated by Django 3.0.9 on 2020-08-03 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=70)),
                ('cost', models.DecimalField(decimal_places=2, max_digits=5)),
                ('description', models.CharField(default='', max_length=200)),
                ('unit', models.CharField(default='', max_length=70)),
            ],
        ),
    ]
