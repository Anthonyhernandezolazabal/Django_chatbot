# Generated by Django 4.0.1 on 2022-02-04 17:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chatbot', '0002_chat_user_nombre_persona'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='chat_user',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelTable(
            name='chat_user',
            table='chat_user',
        ),
    ]