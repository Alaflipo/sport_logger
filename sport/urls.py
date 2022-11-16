from django.urls import path

from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('activ/', views.get_activities, name='activities'),
    path('activ/<str:pk>', views.get_activity, name='activity')
]
