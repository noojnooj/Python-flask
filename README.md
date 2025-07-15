# Python-flask

## 폴더 구조

```
Python-flask
├─ README.md
├─ client
└─ server
   ├─ venv
   └─ app.py
```

## React 클라이언트에서 Flask 백엔드의 REST API 연동

1. Client 생성

```bash
npx create-react-app client --template typescript
```

2. Server 생성

```bash
mkdir server
cd server
```

3. 가상환경 생성 및 진입(mac 기준)

```bash
# 생성
python3 -m venv venv

# 진입
source venv/bin/activate
```

4. Flack 및 CORS 모듈 설치

```bash
pip3 install flask

# flask_cors 모듈
pip3 install flask_cors
```

5. 웹 서버 생성

```py
# app.py
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/hello', methods=['GET', 'OPTIONS'])
def hello():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(host='localhost', port=5001, debug=True)
```

6. Client와 연동

```typescript
// App.tsx
import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/hello")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
```

7. 실행

```bash
cd client
npm start
```

```bash
cd server
python3 app.py
```

## CORS 오류

403 Forbidden CORS 정책 위반 오류가 나와 클라이언트에서 프록시 설정도 해보았지만 해결되지는 않았습니다.

```JSON
{
  "name": "client",
  "version": "0.1.0",
  "proxy": "http://localhost:5000",
  "private": true,
  "dependencies": {
```

CORS도 클라이언트 주소를 직접적으로 허용하게 해보았지만 되지않았고, 서버의 포트 번호를 5000번에서 5001번으로 변경했더니 해결되었습니다.
기본적으로 mac에서 5000번 포트를 사용하는 듯 합니다.

```py
    app.run(host='localhost', port=5001, debug=True)
```
