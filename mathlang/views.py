from django.http import HttpResponse
from django.forms import ModelForm
from django.shortcuts import render, get_object_or_404, redirect
from .application import api

# Gloval variable

def index(request):
    return render(request, 'mathlang/index.html')

def CallAPI(req):
    if req.method == 'GET':
        list = api.word2vec(req.GET['input_data'])
        return HttpResponse(list)