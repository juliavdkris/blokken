from django.http import JsonResponse, HttpResponse
from . import models
from django.core.exceptions import ObjectDoesNotExist

import json



def json_error(error):
	return JsonResponse({
		'ok': False,
		'error': error
	})



def get_list_test(request, id):
	try:
		test = models.Test.objects.get(id=id)
	except ObjectDoesNotExist:
		return json_error('Test not found')

	try:
		list = models.List.objects.get(id=test.list.id)
	except ObjectDoesNotExist:
		return json_error('Invalid test: list not found')

	merged = []
	list_sorted = sorted(list.content, key=lambda item: item['id'])  # Sort the randomly shuffled list dictionary
	for item_progress, item_list in zip(test.progress, list_sorted):
		merged.append({**item_progress, **item_list})

	return JsonResponse({
		'ok': True,
		'response': merged
	})



def store_progress(request, id):
	if request.method != 'POST':
		return HttpResponse('Yo you should post to this thing')

	try:
		test = models.Test.objects.get(id=id)
		if request.user != test.user:
			return HttpResponse('User not authenticated or wrong account')

		# Parse JSON and split data
		merged = json.loads(request.body)
		splitted = []
		for item in merged:
			splitted.append({
				'id': item['id'],
				'level': item['level'],
				'noRepeat': item['noRepeat'],
				'extraRepeat': item['extraRepeat']
			})

		# Save modified progress data
		test.progress = splitted
		test.save()
		return HttpResponse('Ok')

	except json.decoder.JSONDecodeError:
		return HttpResponse('Invalid JSON yo')



def create_list(request):
	if request.method != 'POST':
		return HttpResponse('Yo you should post to this thing')

	try:
		# Parse JSON and split data
		list_parsed = json.loads(request.body)
		list = models.List(user=request.user, name=list_parsed['name'], content=list_parsed['content'])
		list.save()
		progress = [{'id': item['id'], 'level': None, 'noRepeat': False, 'extraRepeat': False} for item in list_parsed['content']]  # List of items with id from new list and default level/noRepeat/extraRepeat values
		test = models.Test(user=request.user, list=list, progress=progress)
		test.save()
		return HttpResponse('Ok')

	except json.decoder.JSONDecodeError:
		return HttpResponse('Invalid JSON yo')