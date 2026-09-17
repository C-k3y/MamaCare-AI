from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'status': 'online',
        'message': 'Welcome to the MamaCare-AI Backend API',
        'version': '1.0.0'
    })

def custom_404(request, exception=None):
    return JsonResponse({
        'error': 'Not Found',
        'message': 'The requested URL was not found on this server.'
    }, status=404)

def custom_500(request):
    return JsonResponse({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred on the server.'
    }, status=500)
