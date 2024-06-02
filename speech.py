from flask import Flask, request, jsonify
import speech_recognition as sr

from flask_cors import CORS

app = Flask(__name__)
CORS(app)  
app = Flask(__name__)

@app.route('/voice-search', methods=['POST'])
def voice_search():
    try:
        audio_file = request.files['audio']
        recognizer = sr.Recognizer()
        with sr.AudioFile(audio_file) as source:
            audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        return jsonify({'transcript': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
