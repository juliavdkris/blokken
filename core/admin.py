from django.contrib import admin
from . import models



class ListAdmin(admin.ModelAdmin):
	list_display = ['id', 'name', 'date_created']


class TestAdmin(admin.ModelAdmin):
	list_display = ['id', 'list', 'get_list_name']

	def get_list_name(self, obj):
		return obj.list.name
	get_list_name.short_description = 'List name'



admin.site.register(models.List, ListAdmin)
admin.site.register(models.Test, TestAdmin)