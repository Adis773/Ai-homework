from flask import Flask, request, jsonify
app = Flask(__name__)
app.config['SECRET_KEY'] = 'YOUR_SECRET_KEY'  # Используйте сильный секретный ключ
# Дополнительно можно использовать Flask-WTF для защиты от CSRF

# Эндпоинт для проверки подписки (премиум)
@app.route("/api/subscribe", methods=["POST"])
def subscribe():
    data = request.json
    # Ожидается: {"user": "username", "days": 30, "amount": 1500}
    # Здесь добавьте интеграцию с API платежной системы (Kaspi, Halyk, СБП, Тинькофф и т.д.)
    # Для демонстрации возвращаем успех
    return jsonify({"status": "success", "message": "Премиум активирован!"})

# Эндпоинт для обработки OCR (загрузка фото)
import pytesseract
from PIL import Image
import io

@app.route("/photo", methods=["POST"])
def photo():
    if "photo" not in request.files:
        return jsonify({"error": "Нет файла"}), 400
    file = request.files["photo"]
    try:
        image = Image.open(io.BytesIO(file.read()))
        text = pytesseract.image_to_string(image, lang='rus')
        return jsonify({"text": text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Запускайте сервер через HTTPS в продакшене (например, через reverse proxy)
    app.run(port=5000, debug=True)
