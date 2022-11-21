from rest_framework.serializers import ModelSerializer
from .models import Activity, User, PersonalActivity


# A serializer converts a python model object to a json response
# which can be used by the frontend
class PersonalActivitySerializer(ModelSerializer):
    class Meta:
        model = PersonalActivity
        fields = '__all__'


class ActivitySerializer(ModelSerializer):
    class Meta:
        model = Activity
        # this can also be something like ['name', 'description']
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        # this can also be something like ['name', 'description']
        fields = '__all__'
