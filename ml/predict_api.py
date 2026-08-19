from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

print("🚀 Starting ML Prediction API...")
print("=" * 50)

model_path = '../model.pkl'
metadata_path = '../model_metadata.json'
importance_path = '../feature_importance.json'

if not os.path.exists(model_path):
    print("❌ Model not found! Please run train_model.py first.")
    exit(1)

model = joblib.load(model_path)

with open(metadata_path, 'r') as f:
    metadata = json.load(f)

with open(importance_path, 'r') as f:
    importance = json.load(f)

print(f"✅ Loaded {metadata['model_type']} model")
print(f"   Accuracy: {metadata['accuracy']:.2f}%")
print(f"   Features: {metadata['features']}")
print("=" * 50)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model': metadata['model_type'],
        'accuracy': metadata['accuracy'],
        'features': metadata['features'],
        'timestamp': datetime.now().isoformat()
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(f"📥 Received: {data}")
        
        features = [
            data.get('day_of_week', 5),
            data.get('month', 7),
            data.get('temperature', 28.0),
            data.get('humidity', 78.0),
            data.get('is_holiday', 0),
            data.get('virus_outbreak', 1),
            data.get('previous_patients', 184)
        ]
        
        features_array = np.array([features], dtype=np.float32)
        prediction = model.predict(features_array)[0]
        prediction = max(0, int(round(prediction)))
        
        feature_importance = {}
        for feature in metadata['features']:
            feature_importance[feature] = importance[feature]['importance'] * 100
        
        response = {
            'predicted_patients': prediction,
            'confidence': metadata['accuracy'],
            'model_used': f"{metadata['model_type']} (Real Data)",
            'timestamp': datetime.now().isoformat(),
            'features_used': metadata['features'],
            'feature_importance': feature_importance,
            'input_features': {
                'day_of_week': features[0],
                'month': features[1],
                'temperature': features[2],
                'humidity': features[3],
                'is_holiday': features[4],
                'virus_outbreak': features[5],
                'previous_patients': features[6]
            }
        }
        
        print(f"📤 Prediction: {prediction} patients")
        return jsonify(response)
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/explain', methods=['GET'])
def explain():
    try:
        factors = []
        for feature, data in importance.items():
            factors.append({
                'feature': feature,
                'importance': data['importance'] * 100,
                'description': data['description']
            })
        
        factors.sort(key=lambda x: x['importance'], reverse=True)
        
        return jsonify({
            'factors': factors,
            'model_accuracy': metadata['accuracy'],
            'total_features': len(factors)
        })
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='0.0.0.0')