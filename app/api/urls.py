from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
urlpatterns = [
    path('', login_required(views.ApiOverview), name='home'),
    path('create/', login_required(views.add_items), name='add-items'),
    path('all/', login_required(views.view_items), name='view_items'),
    path('update/<int:pk>/', login_required(views.update_items), name='update-items'),
    path('item/<int:pk>/delete/', login_required(views.delete_items), name='delete-items'),
]