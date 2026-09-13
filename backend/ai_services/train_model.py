import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

def generate_synthetic_data(num_samples=1000):
    np.random.seed(42)
    
    # Base features
    age = np.random.randint(18, 45, num_samples)
    gestational_age_weeks = np.random.randint(4, 41, num_samples)
    
    # Vitals with some noise
    systolic_bp = np.random.normal(120, 15, num_samples)
    diastolic_bp = np.random.normal(80, 10, num_samples)
    weight_kg = np.random.normal(70, 12, num_samples) + (gestational_age_weeks * 0.3)
    blood_glucose = np.random.normal(90, 20, num_samples)
    fetal_movement_count = np.where(
        gestational_age_weeks > 24, 
        np.random.randint(0, 15, num_samples), 
        0
    )
    
    df = pd.DataFrame({
        'age': age,
        'gestational_age_weeks': gestational_age_weeks,
        'systolic_bp': systolic_bp,
        'diastolic_bp': diastolic_bp,
        'weight_kg': weight_kg,
        'blood_glucose': blood_glucose,
        'fetal_movement_count': fetal_movement_count
    })
    
    # Define risk logic to create target variable
    # Risk factors: High BP, High Glucose, Low Fetal Movement in late pregnancy, extreme age
    risk_score = np.zeros(num_samples)
    
    risk_score += np.where((systolic_bp > 140) | (diastolic_bp > 90), 2, 0)
    risk_score += np.where(blood_glucose > 140, 1, 0)
    risk_score += np.where((gestational_age_weeks > 26) & (fetal_movement_count < 4), 2, 0)
    risk_score += np.where((age < 20) | (age > 35), 1, 0)
    
    # Binary classification: 1 (At Risk), 0 (Low Risk)
    df['is_high_risk'] = np.where(risk_score >= 2, 1, 0)
    
    return df

def train_and_save_model():
    print("1. Generating synthetic maternal health dataset...")
    df = generate_synthetic_data(2000)
    
    print(f"Dataset generated. Shape: {df.shape}")
    print(f"Risk distribution:\n{df['is_high_risk'].value_counts(normalize=True)}")
    
    # Features match the FEATURE_COLUMNS in ml_service.py
    X = df[['age', 'gestational_age_weeks', 'systolic_bp', 'diastolic_bp', 'weight_kg', 'blood_glucose', 'fetal_movement_count']]
    y = df['is_high_risk']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("\n2. Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("\n3. Training RandomForestClassifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=5)
    model.fit(X_train_scaled, y_train)
    
    print("\n4. Evaluating Model...")
    y_pred = model.predict(X_test_scaled)
    print(classification_report(y_test, y_pred))
    
    print("\n5. Saving models to disk...")
    # Ensure directory exists
    base_dir = os.path.dirname(os.path.abspath(__file__))
    models_dir = os.path.join(base_dir, 'ml_models')
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, 'risk_model.pkl')
    scaler_path = os.path.join(models_dir, 'scaler.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"Success! Models saved to:")
    print(f" - {model_path}")
    print(f" - {scaler_path}")
    print("\nThe RiskModelService will automatically pick these up on the next request.")

if __name__ == "__main__":
    train_and_save_model()
