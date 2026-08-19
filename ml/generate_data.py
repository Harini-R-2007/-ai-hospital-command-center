import pandas as pd
import numpy as np
from datetime import datetime, timedelta

print("📊 Generating Synthetic Hospital Dataset...")
print("=" * 50)

np.random.seed(42)

start_date = datetime(2022, 1, 1)
end_date = datetime(2024, 12, 31)
dates = pd.date_range(start=start_date, end=end_date, freq='D')

print(f"📅 Generating {len(dates)} days of data...")

data = {
    'date': dates,
    'day_of_week': [d.weekday() for d in dates],
    'month': [d.month for d in dates],
    'year': [d.year for d in dates],
}

data['temperature'] = np.random.normal(25, 8, len(dates))
data['humidity'] = np.random.normal(65, 15, len(dates))
data['is_holiday'] = np.random.choice([0, 1], len(dates), p=[0.93, 0.07])

virus_prob = []
for month in data['month']:
    if month in [11, 12, 1, 2]:
        virus_prob.append(0.3)
    elif month in [6, 7, 8]:
        virus_prob.append(0.05)
    else:
        virus_prob.append(0.15)
data['virus_outbreak'] = [np.random.choice([0, 1], p=[1-p, p]) for p in virus_prob]

baseline = 180
data['previous_patients'] = np.random.normal(baseline, 30, len(dates))
data['previous_patients'] = np.clip(data['previous_patients'], 80, 300)

patient_count = (
    100
    + 8 * np.array(data['day_of_week'])
    + 2 * np.array(data['month'])
    + 0.5 * np.array(data['temperature'])
    + 25 * np.array(data['virus_outbreak'])
    + 0.4 * np.array(data['previous_patients'])
    + np.random.normal(0, 15, len(dates))
)

data['patient_count'] = np.clip(patient_count, 80, 350).astype(int)
data['patient_count_tomorrow'] = np.roll(data['patient_count'], -1)

df = pd.DataFrame(data)
df = df[:-1]

df['temperature'] = df['temperature'].round(1)
df['humidity'] = df['humidity'].round(1)
df['previous_patients'] = df['previous_patients'].astype(int)

print(f"\n✅ Generated {len(df)} records")

print("\n📊 Sample Data (First 5 rows):")
print(df.head())

df.to_csv('../data/hospital_admissions.csv', index=False)
print(f"\n💾 Data saved to 'data/hospital_admissions.csv'")

print("\n📈 Data Statistics:")
print(f"Average Patients: {df['patient_count'].mean():.1f}")
print(f"Max Patients: {df['patient_count'].max()}")
print(f"Min Patients: {df['patient_count'].min()}")
print(f"Standard Deviation: {df['patient_count'].std():.1f}")
print("=" * 50)
print("✅ Data generation complete!")