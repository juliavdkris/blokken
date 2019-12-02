"""blokken URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
	https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
	1. Add an import:  from my_app import views
	2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
	1. Add an import:  from other_app.views import Home
	2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
	1. Import the include() function: from django.urls import include, path
	2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import core.views
import core.api_views

urlpatterns = [
	path('', core.views.index),
	path('leren', core.views.leren),
	path('lists/new', core.views.newlist),

	path('api/getlisttest/<id>', core.api_views.getListTest),
	path('api/storeprogress/<id>', core.api_views.storeProgress),
	path('api/createlist', core.api_views.createList),

	path('admin/', admin.site.urls),
]
