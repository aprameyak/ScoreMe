# **ScoreMe - Exam Score Predictor**

ScoreMe is a web application designed to predict student exam scores based on input data. Built using a Kaggle student exam performance dataset, the project leverages data analysis and machine learning techniques to predict exam scores with high accuracy. The application features a Flask API backend, a React.js frontend, and a Scikit-Learn linear regression model, packaged and deployed for real-time predictions.

## Features

- **Data Analysis**: Processed and analyzed a Kaggle student exam performance dataset using Pandas, Matplotlib, and Seaborn to identify patterns in student performance.
- **Linear Regression Model**: Developed a Scikit-Learn linear regression model to predict student exam scores, achieving 98.8% accuracy.
- **Model Serialization**: Wrapped the trained linear regression model using Pickle for easy deployment and integration with the backend.
- **Real-Time Predictions**: Flask API handles HTTP POST requests and provides real-time predictions of student exam performance, ranging from 0 to 100 marks.
- **Interactive Front-End**: React.js frontend allows users to input data values and view dynamic predictions from the model.
- **Seamless Integration**: Ensured smooth communication between the decoupled frontend and backend for efficient real-time predictions.

## Technology Stack

- **Frontend**: React.js, JavaScript
- **Backend**: Flask (Python)
- **Machine Learning**: Scikit-Learn (Linear Regression)
- **Data Analysis**: Pandas, Matplotlib, Seaborn
- **Model Serialization**: Pickle

