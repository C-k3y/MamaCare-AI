import os
import joblib
import pandas as pd
import numpy as np
from django.conf import settings

class RiskModelService:
    """
    Singleton service to load the XGBoost/Scikit-learn model once into memory
    and provide prediction methods.
    """
    _instance = None
    _model = None
    _scaler = None
    
    # Define the expected feature order for the ML model
    FEATURE_COLUMNS = [
        'age', 
        'gestational_age_weeks', 
        'systolic_bp', 
        'diastolic_bp', 
        'weight_kg', 
        'blood_glucose', 
        'fetal_movement_count'
    ]

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RiskModelService, cls).__new__(cls)
            cls._instance._load_model()
        return cls._instance

    def _load_model(self):
        """Loads the .pkl files into memory. Uses a mock if files don't exist."""
        model_path = os.path.join(settings.BASE_DIR, 'ai_services', 'ml_models', 'risk_model.pkl')
        scaler_path = os.path.join(settings.BASE_DIR, 'ai_services', 'ml_models', 'scaler.pkl')
        
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            self._model = joblib.load(model_path)
            self._scaler = joblib.load(scaler_path)
            print("Successfully loaded ML models from disk.")
        else:
            print("Warning: ML models not found on disk. Using Mock Model for development.")
            self._model = "MOCK_MODEL"
            self._scaler = "MOCK_SCALER"

    def preprocess(self, vitals_record):
        """
        Data preprocessing pipeline.
        Extracts features from the VitalLog history and Mother Profile.
        """
        # 1. Extract Mother's Age
        mother_profile = vitals_record.pregnancy.mother.mother_profile
        age = 25 # Default if missing
        if mother_profile.date_of_birth:
            import datetime
            age = (datetime.date.today() - mother_profile.date_of_birth).days // 365
            
        # 2. Extract Gestational Age
        gestational_age = vitals_record.pregnancy.gestational_age_weeks or 0
        
        # 3. Handle missing vitals (Imputation)
        # In a real pipeline, we might use SimpleImputer fitted on training data
        systolic = vitals_record.blood_pressure_systolic or 120
        diastolic = vitals_record.blood_pressure_diastolic or 80
        weight = vitals_record.weight_kg or 70.0
        glucose = vitals_record.blood_glucose_mg_dl or 90
        fetal_movement = vitals_record.fetal_movement_count or 10
        
        # 4. Construct feature dictionary
        features = {
            'age': age,
            'gestational_age_weeks': gestational_age,
            'systolic_bp': systolic,
            'diastolic_bp': diastolic,
            'weight_kg': float(weight),
            'blood_glucose': glucose,
            'fetal_movement_count': fetal_movement
        }
        
        # 5. Convert to DataFrame
        df = pd.DataFrame([features], columns=self.FEATURE_COLUMNS)
        
        # 6. Scale features
        if self._scaler != "MOCK_SCALER":
            scaled_features = self._scaler.transform(df)
            return scaled_features, features
            
        return df.values, features

    def predict_risk(self, vitals_record):
        """
        Predicts the risk level for a given VitalsRecord.
        Returns: risk_score (float), risk_level (str), contributing_factors (dict)
        """
        X_scaled, raw_features = self.preprocess(vitals_record)
        
        if self._model == "MOCK_MODEL":
            # Mock logic based on clinical thresholds
            score = 0.1
            level = 'low'
            factors = {}
            
            if raw_features['systolic_bp'] > 140 or raw_features['diastolic_bp'] > 90:
                score += 0.4
                factors['High Blood Pressure'] = f"{raw_features['systolic_bp']}/{raw_features['diastolic_bp']}"
            if raw_features['blood_glucose'] > 140:
                score += 0.3
                factors['High Blood Glucose'] = f"{raw_features['blood_glucose']} mg/dL"
                
            if score > 0.6:
                level = 'high'
            elif score > 0.3:
                level = 'medium'
                
            return score, level, factors
            
        else:
            # Real model inference
            probabilities = self._model.predict_proba(X_scaled)[0]
            risk_score = float(probabilities[1]) # Assuming class 1 is "At Risk"
            
            level = 'low'
            if risk_score > 0.7:
                level = 'high'
            elif risk_score > 0.4:
                level = 'medium'
                
            # TODO: Integrate SHAP explainer here to populate contributing factors
            factors = {'Note': 'SHAP integration pending'}
            
            return risk_score, level, factors
