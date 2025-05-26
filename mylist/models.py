from django.db import models
from datetime import date

# Create your models here. Erbe von models.Model für alle Klassen
class ShoppingItem(models.Model):
    created_at = models.DateField(default=date.today)
    name =  models.CharField(max_length=200)
    done =  models.BooleanField(default=False)
    
    def __str__(self): # gibt im Admin interface den richtigen ItemName zurück
        return str(self.id) + " - " + self.name