import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
import logging
from typing import List, Dict

logger = logging.getLogger("DetectionEngine")

class DetectionService:
    def __init__(self):
        # Initialize model with reasonable defaults for cybersecurity
        self.model = IsolationForest(
            n_estimators=100,
            contamination=0.05, # Expect ~5% anomalies
            random_state=42
        )
        self.is_trained = False
        logger.info("Detection Engine Initialized")

    def train(self, data: List[Dict]):
        """
        Trains the Isolation Forest on a sequence of action features.
        Features could include: [api_call_ratio, error_rate, token_usage, latency]
        """
        if not data:
            logger.warning("No data provided for training")
            return

        df = pd.DataFrame(data)
        self.model.fit(df)
        self.is_trained = True
        logger.info(f"Model trained on {len(data)} samples")

    def predict(self, features: Dict) -> Dict:
        """
        Predicts if a set of features constitutes an anomaly.
        """
        if not self.is_trained:
            # Fallback to a simple heuristic if not trained
            logger.warning("Model not trained, using heuristic")
            return {"is_anomaly": False, "score": 0.0, "explanation": "Heuristic: Model not ready"}

        try:
            vector = np.array([list(features.values())])
            prediction = self.model.predict(vector) # 1 for normal, -1 for anomaly
            score = self.model.decision_function(vector) # The shift from 'normal'
            
            is_anomaly = bool(prediction[0] == -1)
            
            return {
                "is_anomaly": is_anomaly,
                "score": float(np.abs(score[0])), # Normalize etc.
                "explanation": "Isolation Forest detected behavioral drift" if is_anomaly else "Normal activity"
            }
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return {"is_anomaly": False, "score": 0.0, "error": str(e)}

    def analyze_sequence(self, actions: List[str]) -> float:
        """
        A simplified placeholder for an LSTM-style sequence analysis.
        Checks for unusual transition frequencies.
        """
        # Heuristic: If we see 'unauthorized_access' or 'key_rotation' suddenly, spike it
        suspicious_terms = ["unauthorized", "isolate", "elevate", "bypass"]
        count = sum(1 for a in actions if any(s in a.lower() for s in suspicious_terms))
        
        return min(1.0, count / (len(actions) or 1))

# Singleton instance
detection_engine = DetectionService()
