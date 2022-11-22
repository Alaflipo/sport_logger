from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Activity, User, PersonalActivity
from .serializers import ActivitySerializer, UserSerializer, PersonalActivitySerializer
import datetime

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

#################################################
#              PersonalActivities               #
#################################################


@api_view(['GET'])
def get_personal_activities(request):
    personal_activities = PersonalActivity.objects.all()
    # many means; are we going to pass in one object or multiple?
    serializer = PersonalActivitySerializer(personal_activities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_personal_activity(request, pk):
    personal_activity = PersonalActivity.objects.get(id=pk)
    # many means; are we going to pass in one object or multiple?
    serializer = PersonalActivitySerializer(personal_activity, many=False)
    return Response(serializer.data)


# filters the output on user
@api_view(['GET'])
def get_personal_activity_user(request, activ, user):
    personal_activity = PersonalActivity.objects.filter(
        person=user, activity=activ).order_by('date')
    serializer = PersonalActivitySerializer(personal_activity, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_personal_activity(request):
    data = request.data
    print(data)
    person = User.objects.get(id=data['person'])
    activity = Activity.objects.get(id=data['activity'])
    date = datetime.datetime.now()
    if ('' != data['date']):
        date = data['date']
    personal_activity = PersonalActivity.objects.create(
        person=person,
        activity=activity,
        weight=data['weight'],
        date=date
    )
    serializer = PersonalActivitySerializer(personal_activity, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def edit_personal_activity(request, pk):
    data = request.data
    personal_activity = PersonalActivity.objects.get(id=pk)
    serializer = PersonalActivitySerializer(
        instance=personal_activity, data=data)

    if serializer.is_valid():
        serializer.save()
    else:
        print(data)
        print(serializer.errors)

    return Response(serializer.data)


@api_view(['DELETE'])
def delete_personal_activity(request, pk):
    personal_activity = PersonalActivity.objects.get(id=pk)
    personal_activity.delete()
    return Response('activity was deleted!')

#################################################
#                   Activities                  #
#################################################


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


#################################################
#                     Users                     #
#################################################

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
