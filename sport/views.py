from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Activity
from .serializers import ActivitySerializer

# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/activ/',
            'method': 'GET',
            'body': None,
            'description': 'returns an array of activities'
        },
        {
            'Endpoint': 'activ/id',
            'method': 'GET',
            'body': None,
            'description': 'returns a single activity '
        },
        {
            'hello': 'lol'
        }
    ]
    # return HttpResponse("Hello world, You're at the polls index")
    return Response(routes)


@api_view(['GET'])
def get_activities(request):
    activities = Activity.objects.all()
    # many means; are we going to pass in one object or multiple?
    serializer = ActivitySerializer(activities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_activity(request, pk):
    activity = Activity.objects.get(id=pk)
    # many means; are we going to pass in one object or multiple?
    serializer = ActivitySerializer(activity, many=False)
    return Response(serializer.data)
