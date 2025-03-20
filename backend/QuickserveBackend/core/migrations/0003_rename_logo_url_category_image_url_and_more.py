# Generated by Django 5.1.6 on 2025-03-06 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_subcategory'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='logo_url',
            new_name='image_url',
        ),
        migrations.AddField(
            model_name='subcategory',
            name='image_url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
