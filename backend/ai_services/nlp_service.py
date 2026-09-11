import os

# Rule-based fallback safety net
EMERGENCY_KEYWORDS = [
    'bleeding', 'severe pain', 'loss of vision', 'blurriness',
    'fainting', 'unconscious', 'water broke', 'no movement'
]
MEDIUM_KEYWORDS = [
    'cramping', 'fever', 'chills', 'vomiting', 'dizziness'
]

class NLPService:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self._load_huggingface_model()

    def _load_huggingface_model(self):
        """
        Loads the Hugging Face zero-shot classification model.
        Uses a try-except block so the app doesn't crash if transformers/torch aren't installed yet.
        """
        try:
            from transformers import pipeline
            # Using a lightweight zero-shot classification model for symptom triage
            self.classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
            print("Loaded Hugging Face NLP model.")
        except ImportError:
            print("Warning: 'transformers' or 'torch' not installed. Using rule-based fallback only.")
            self.classifier = None

    def triage_symptoms(self, free_text):
        """
        Analyzes free text symptoms.
        Returns urgency (Low / Medium / Emergency) and AI assessment text.
        """
        text_lower = free_text.lower()
        
        # 1. First Pass: Rule-based fallback logic (Pre-ML safety net)
        for keyword in EMERGENCY_KEYWORDS:
            if keyword in text_lower:
                return 'Emergency', f"Safety Alert: You mentioned '{keyword}'. Please seek emergency medical care immediately or trigger the SOS button."
                
        for keyword in MEDIUM_KEYWORDS:
            if keyword in text_lower:
                return 'Medium', f"You mentioned '{keyword}'. This requires attention. Please monitor your symptoms and consider booking an appointment with your doctor soon."
                
        # 2. Second Pass: ML Classification (if installed and no immediate rules triggered)
        if self.classifier:
            try:
                candidate_labels = ["normal pregnancy symptom", "requires medical attention", "medical emergency"]
                result = self.classifier(free_text, candidate_labels)
                
                top_label = result['labels'][0]
                top_score = result['scores'][0]
                
                if top_label == "medical emergency" and top_score > 0.5:
                    return 'Emergency', "Our AI detected a potential medical emergency. Please contact your healthcare provider immediately."
                elif top_label == "requires medical attention" and top_score > 0.4:
                    return 'Medium', "Based on your symptoms, it is recommended that you speak to a doctor to be safe."
                else:
                    return 'Low', "These symptoms appear to be typical. However, always trust your instincts and consult a doctor if you feel unwell."
            except Exception as e:
                pass # Fall back to Low if ML fails

        # 3. Final Fallback
        return 'Low', "Based on your input, your symptoms seem mild. Rest and stay hydrated, but contact a doctor if things worsen."
