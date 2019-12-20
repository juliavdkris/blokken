from django.shortcuts import render
from . import models


def index(request):
	return render(request, 'home.html')


def leren(request):
	return render(request, 'leren.html')


def new_list(request):
	return render(request, 'newlist.html')