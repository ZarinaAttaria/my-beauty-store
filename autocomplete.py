from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load dataset from CSV file
df = pd.read_csv('products.csv')
products = df['product_name'].tolist()

# Train a nearest neighbors model
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(products)
model = NearestNeighbors(n_neighbors=5, algorithm='brute')
model.fit(X)

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('query', '')
    if not query:
        return jsonify([])

    query_vector = vectorizer.transform([query])
    _, indices = model.kneighbors(query_vector)
    suggestions = [products[i] for i in indices[0]]
    return jsonify(suggestions)

if __name__ == '__main__':
    app.run(debug=True)
