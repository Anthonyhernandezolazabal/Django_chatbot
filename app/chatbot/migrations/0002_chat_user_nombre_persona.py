# Generated by Django 4.0.1 on 2022-02-04 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatbot', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat_user',
            name='nombre_persona',
            field=models.CharField(max_length=50, null=True, verbose_name='Nombre de la persona'),
        ),
    ]
