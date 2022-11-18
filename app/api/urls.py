from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
urlpatterns = [
    path('', login_required(views.ApiOverview), name='home'),
    path('create/', login_required(views.add_items), name='add-items'),
    path('all/', views.view_items, name='view_items'),
    path('update/<int:pk>/', login_required(views.update_items), name='update-items'),
    path('item/<int:pk>/delete/', login_required(views.delete_items), name='delete-items'),

    path('all_style/', login_required(views.view_style_items), name='view_style_items'),
    path('create_style/', login_required(views.add_style_items), name='add_style_items'),
    path('update_style/<int:pk>/', login_required(views.update_style_items), name='update-stye-items'),



    path('all_profile/', views.view_profile_items, name='view_items_items'),
    path('update_profile/<int:pk>/', login_required(views.update__profle_items), name='update-profile-items'),
]