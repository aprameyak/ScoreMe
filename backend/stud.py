import pandas as pd
import pickle
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn import metrics
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
df = pd.read_csv(r"backend/Student_Performance.csv")
df['Extracurricular Activities'] = df['Extracurricular Activities'].replace("Yes", 1)
df['Extracurricular Activities'] = df['Extracurricular Activities'].replace("No", 0)
X = df.drop('Performance Index', axis=1)
y = df['Performance Index']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
y_actual_data = y_test
scaler = StandardScaler()
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
linear_reg = LinearRegression()
linear_reg.fit(X_train_scaled, y_train)
filename = 'model.pkl'
with open(filename, 'wb') as file:
    pickle.dump(linear_reg, file)
with open(filename, 'rb') as file:
    loaded_model = pickle.load(file)

app = Flask(__name__)
CORS(app)
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        required_keys = ['Hours Studied', 'Previous Scores', 'Extracurricular Activities', 'Sleep Hours', 'Sample Question Papers Practiced']
        for key in required_keys:
            if key not in data:
                raise ValueError(f"Missing required key: {key}")

        new_data = pd.DataFrame({
            key: [data[key]] for key in required_keys
        })

        new_data_scaled = scaler.transform(new_data)
        predictions = loaded_model.predict(new_data_scaled)
        if(predictions[0].round(0)>100):
            prediction=100
        elif(predictions[0].round(0)<0):
            prediction=0
        else:
            prediction = predictions[0].round(0)

        response = {'predicted_performance_index': prediction}
        return jsonify(response)
    except Exception as e:
        return f"Error: {str(e)}", 400


if __name__ == '__main__':
    app.run(port=8000, debug=True)


