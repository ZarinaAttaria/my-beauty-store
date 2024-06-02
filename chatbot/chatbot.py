import sys
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

try:
    df = pd.read_csv('dataset.csv')
except FileNotFoundError:
    print("Error: Dataset file 'dataset.csv' not found.")
    sys.exit(1)

def handle_message(message):
    try:
        questions = pd.concat([df['question'], pd.Series([message])], ignore_index=True)

        vectorizer = TfidfVectorizer().fit_transform(questions)
        vectors = vectorizer.toarray()
        
        cosine_similarities = cosine_similarity(vectors[-1].reshape(1, -1), vectors[:-1])
        similar_index = cosine_similarities.argmax()

        response = df.iloc[similar_index]['response']
        return response
    except Exception as e:
        print("Error processing message:", e)
        return "Error: Unable to process the message."

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python chatbot.py <message>")
        sys.exit(1)
    message = sys.argv[1]
    response = handle_message(message)
    print(response)
