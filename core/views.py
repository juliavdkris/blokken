from django.shortcuts import render
from . import models


def index(request):
	return render(request, 'home.html')


def leren(request):
	return render(request, 'leren.html')


def new_list(request):
	return render(request, 'newlist.html')


def lists(request):
	tests = models.Test.objects.filter(user=request.user)
	context = {'tests': tests}
	return render(request, 'lists.html', context=context)