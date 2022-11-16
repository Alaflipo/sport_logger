from rest_framework.serializers import ModelSerializer
from .models import Activity


# A serializer converts a python model object to a json response
# which can be used by the frontend
class ActivitySerializer(ModelSerializer):
    class Meta:
        model = Activity
        # this can also be something like ['name', 'description']
        fields = '__all__'
