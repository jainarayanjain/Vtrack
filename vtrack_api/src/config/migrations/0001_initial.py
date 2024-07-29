# Generated by Django 4.2 on 2024-07-29 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app', models.CharField(max_length=50, verbose_name='app')),
                ('section', models.CharField(max_length=50, verbose_name='section')),
                ('sub_section', models.CharField(max_length=50, verbose_name='sub section')),
                ('key', models.CharField(max_length=50, verbose_name='key')),
                ('description', models.TextField(verbose_name='description')),
                ('value', models.JSONField(verbose_name='value')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='updated')),
            ],
        ),
        migrations.AddConstraint(
            model_name='item',
            constraint=models.UniqueConstraint(fields=('app', 'section', 'sub_section', 'key'), name='unique_config'),
        ),
    ]
