# Generated by Django 4.1.5 on 2023-02-21 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("layout_api", "0002_bodypost_mainfeaturedpost_newspost"),
    ]

    operations = [
        migrations.CreateModel(
            name="testUser",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("testUserId", models.CharField(max_length=120)),
                ("testUserPw", models.CharField(max_length=120)),
            ],
        ),
    ]