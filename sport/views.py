from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Activity, User
from .serializers import ActivitySerializer, UserSerializer

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
            'EndPoint': '/users/',
            'method': 'GET',
            'body': None,
            'description': 'returns an array of users'
        },
        {
            'EndPoint': '/users/id',
            'method': 'GET',
            'body': None,
            'description': 'returns a single user'
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


@api_view(['POST'])
def add_activity(request):
    data = request.data
    activity = Activity.objects.create(
        name=data['name'],
        description=data['description'],
        type=data['type'],
    )
    serializer = ActivitySerializer(activity, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def edit_activity(request, pk):
    data = request.data
    activity = Activity.objects.get(id=pk)
    serializer = ActivitySerializer(instance=activity, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def delete_activity(request, pk):
    activity = Activity.objects.get(id=pk)
    activity.delete()
    return Response('activity was deleted!')


@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    # many means; are we going to pass in one object or multiple?
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_user(request, pk):
    user = User.objects.get(id=pk)
    # many means; are we going to pass in one object or multiple?
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
