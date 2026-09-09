from django.db import models
from users.models import User

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages', null=True, blank=True)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # If it's a message to/from AI
    is_ai = models.BooleanField(default=False)

    def __str__(self):
        return f"From {self.sender.email} at {self.created_at}"
