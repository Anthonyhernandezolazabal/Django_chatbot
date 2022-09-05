# Generated by Django 4.0.1 on 2022-01-27 21:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sessions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='chat_user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pregunta', models.CharField(max_length=100, verbose_name='Escribir mensaje')),
                ('respuesta', models.CharField(default=None, max_length=255, null=True, verbose_name='Respuesta')),
                ('key_session', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='sessions.session')),
            ],
        ),
    ]