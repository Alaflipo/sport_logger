from django.urls import path

from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),

    path('pactiv/', views.get_personal_activities, name='personal-activities'),
    path('pactiv/add', views.add_personal_activity, name='add-personal-activity'),
    path('pactiv/<str:pk>/edit', views.edit_personal_activity,
         name='edit-personal-activity'),
    path('pactiv/<str:pk>/delete', views.delete_personal_activity,
         name='delete-personal-activity'),
    path('pactiv/<str:pk>', views.get_personal_activity, name='personal-activity'),

    path('activ/', views.get_activities, name='activities'),
    path('activ/add', views.add_activity, name='add-activity'),
    path('activ/<str:pk>/edit', views.edit_activity, name='edit-activity'),
    path('activ/<str:pk>/delete', views.delete_activity, name='delete-activity'),
    path('activ/<str:pk>', views.get_activity, name='activity'),

    path('users/', views.get_users, name='users'),
    path('users/<str:pk>', views.get_user, name='user'),
]
