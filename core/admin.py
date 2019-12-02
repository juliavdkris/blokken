from django.contrib import admin
from . import models



class ListAdmin(admin.ModelAdmin):
	list_display = ['id', 'name', 'date_created']


class TestAdmin(admin.ModelAdmin):
	list_display = ['id', 'list']



admin.site.register(models.List, ListAdmin)
admin.site.register(models.Test, TestAdmin)