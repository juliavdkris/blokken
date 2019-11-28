from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User
import uuid



class List(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=100)
	content = JSONField()
	date_created = models.DateField(auto_now_add=True)  # Sets the date when the object is created, but not when updated


class Test(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	list = models.ForeignKey(List, on_delete=models.CASCADE)
	progress = JSONField()