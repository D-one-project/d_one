# Generated by Django 4.1.5 on 2023-04-27 15:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("layout_api", "0006_userprofile"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="email",
            new_name="WaitlistEmail",
        ),
        migrations.DeleteModel(
            name="bodyPost",
        ),
        migrations.DeleteModel(
            name="mainFeaturedPost",
        ),
        migrations.DeleteModel(
            name="newsPost",
        ),
        migrations.DeleteModel(
            name="Todos",
        ),
    ]
