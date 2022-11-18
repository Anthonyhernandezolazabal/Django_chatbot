from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


from django.urls import re_path as url
from django.views.static import serve

from django.conf.urls import handler404, handler500

from chatbot_admin.views import Error404View,Error505View
urlpatterns = [
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    path('admin/', admin.site.urls),
    path('',include('chatbot.urls')),
    path('api/', include('api.urls')),
    path('chatbot_admin/',include('chatbot_admin.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# handler404="chatbot.views.error404"

handler404 = Error404View.as_view()

handler500 = Error505View.as_error_view()