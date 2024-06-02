from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load dataset from CSV file
df = pd.read_csv('products.csv')
products = df['product_name'].tolist()

# Train a simple model
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(products)
y = np.arange(len(products))
model = LogisticRegression()
model.fit(X, y)

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('query', '')
    if not query:
        return jsonify([])

    query_vector = vectorizer.transform([query])
    predictions = model.predict(query_vector)
    predicted_products = [products[p] for p in predictions]
    return jsonify(predicted_products)

if __name__ == '__main__':
    app.run(debug=True)
