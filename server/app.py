from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__) 
CORS(app)

@app.route('/hello', methods=['GET', 'OPTIONS']) 
def hello():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__': # 이 파일이 메인 프로그램으로 실행될 때
    app.run(host='localhost', port=5001, debug=True) 