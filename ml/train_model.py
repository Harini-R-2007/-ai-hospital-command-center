import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import json

# Define the function FIRST (before using it)
def get_feature_description(feature):
    descriptions = {
        'day_of_week': 'Day of the week (0=Monday to 6=Sunday)',
        'month': 'Month of the year (1-12)',
        'temperature': 'Average daily temperature in Celsius',
        'humidity': 'Average daily humidity percentage',
        'is_holiday': 'Whether the day is a public holiday',
        'virus_outbreak': 'Viral outbreak indicator (0=No, 1=Yes)',
        'previous_patients': 'Patient count from previous day'
    }
    return descriptions.get(feature, feature)

print("🚀 Starting Model Training...")
print("=" * 50)

# 1. Load Data
df = pd.read_csv('../data/hospital_admissions.csv')
print(f"📊 Loaded {len(df)} records")

# 2. Prepare Features
features = [
    'day_of_week',
    'month',
    'temperature',
    'humidity',
    'is_holiday',
    'virus_outbreak',
    'previous_patients'
]

X = df[features]
y = df['patient_count_tomorrow']

print(f"\n🔧 Features: {features}")
print(f"🎯 Target: patient_count_tomorrow")

# 3. Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\n📚 Training set: {len(X_train)} records")
print(f"🧪 Test set: {len(X_test)} records")

# 4. Train XGBoost
print("\n🧠 Training XGBoost model...")
model = XGBRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=6,
    random_state=42,
    verbosity=0
)
model.fit(X_train, y_train)

# 5. Evaluate
print("\n📊 Evaluating Model...")
y_pred = model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Calculate accuracy
mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100
accuracy = 100 - mape

print(f"\n✅ Results:")
print(f"   Mean Absolute Error: {mae:.2f} patients")
print(f"   R² Score: {r2:.4f}")
print(f"   Accuracy: {accuracy:.2f}%")

# 6. Save Model
joblib.dump(model, '../model.pkl')
print("\n💾 Model saved as 'model.pkl'")

# 7. Save Feature Importance
feature_importance = {}
for i, feature in enumerate(features):
    feature_importance[feature] = {
        'importance': float(model.feature_importances_[i]),
        'description': get_feature_description(feature)
    }

with open('../feature_importance.json', 'w') as f:
    json.dump(feature_importance, f, indent=2)
print("💾 Feature importance saved to 'feature_importance.json'")

# 8. Save Model Metadata
metadata = {
    'model_type': 'XGBoost',
    'features': features,
    'accuracy': float(accuracy),
    'r2_score': float(r2),
    'mae': float(mae),
    'n_estimators': 100,
    'max_depth': 6,
    'learning_rate': 0.1,
    'training_date': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S'),
    'total_samples': len(df)
}

with open('../model_metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)
print("💾 Model metadata saved to 'model_metadata.json'")

print("\n🎉 Training Complete!")
print("=" * 50)