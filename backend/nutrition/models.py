from django.db import models
from users.models import User

class MealPlan(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    trimester = models.IntegerField(choices=[(1, 'First'), (2, 'Second'), (3, 'Third')], null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class NutritionLog(models.Model):
    mother = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nutrition_logs')
    meal_type = models.CharField(max_length=50, choices=[('breakfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner'), ('snack', 'Snack')])
    food_items = models.TextField()
    calories = models.IntegerField(null=True, blank=True)
    logged_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mother.email} - {self.meal_type}"

class WaterLog(models.Model):
    mother = models.ForeignKey(User, on_delete=models.CASCADE, related_name='water_logs')
    amount_ml = models.IntegerField()
    logged_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mother.email} - {self.amount_ml}ml"
