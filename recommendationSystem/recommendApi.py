from flask import Flask, request, jsonify
from recommend import get_recommendations

app = Flask(__name__)

@app.route('/recommendations/<product_id>', methods=['GET'])
def recommendations(product_id):
    recommendations = get_recommendations(product_id)
    print(f"Recommendations for product_id {product_id}: {recommendations}")
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=5001)
