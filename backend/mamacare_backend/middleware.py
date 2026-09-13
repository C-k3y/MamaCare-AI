import json
from django.utils.deprecation import MiddlewareMixin
from records.models import AuditLog

class AuditLogMiddleware(MiddlewareMixin):
    """
    Middleware to automatically log important write actions (POST, PUT, PATCH, DELETE)
    into the AuditLog model for compliance tracking.
    """
    
    def process_response(self, request, response):
        # We only care about modifying actions (Audit Trails)
        if request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            # We don't want to log auth token fetching heavily, but for now we skip GETs
            if request.path.startswith('/api/') and not request.path.startswith('/api/token'):
                
                # Extract IP
                x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
                if x_forwarded_for:
                    ip = x_forwarded_for.split(',')[0]
                else:
                    ip = request.META.get('REMOTE_ADDR')

                # Identify user
                user = None
                if request.user.is_authenticated:
                    user = request.user

                # Try to get basic details from request
                details = {
                    'path': request.path,
                    'method': request.method,
                    'status_code': response.status_code,
                }

                # Save log
                # Wrap in try-except so a failing log doesn't crash the response
                try:
                    AuditLog.objects.create(
                        user=user,
                        action=f"{request.method} on {request.path}",
                        module=request.path.split('/')[2] if len(request.path.split('/')) > 2 else 'general',
                        ip_address=ip,
                        details=details
                    )
                except Exception as e:
                    print(f"Failed to save AuditLog: {e}")

        return response
