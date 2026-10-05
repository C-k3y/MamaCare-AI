from django.contrib import admin
from .models import PregnancyRecord, VitalsRecord, MedicalDocument, AuditLog

@admin.register(PregnancyRecord)
class PregnancyRecordAdmin(admin.ModelAdmin):
    list_display = ('mother', 'lmp', 'edd', 'gravida', 'para', 'is_active', 'created_at')
    search_fields = ('mother__email', 'mother__first_name', 'mother__last_name')
    list_filter = ('is_active',)

@admin.register(VitalsRecord)
class VitalsRecordAdmin(admin.ModelAdmin):
    list_display = ('pregnancy', 'recorded_by', 'blood_pressure_systolic', 'blood_pressure_diastolic', 'weight_kg', 'fetal_heart_rate_bpm', 'timestamp')
    search_fields = ('pregnancy__mother__email',)
    list_filter = ('timestamp',)

@admin.register(MedicalDocument)
class MedicalDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'pregnancy', 'document_type', 'uploaded_by', 'uploaded_at')
    list_filter = ('document_type', 'uploaded_at')

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'module', 'ip_address', 'timestamp')
    list_filter = ('module', 'timestamp')
