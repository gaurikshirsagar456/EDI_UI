from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL configuration
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="voting"
)

@app.route("/hello", methods=["POST"])
def hello():
    print("HEkjasbfjkhabihdbasdblad[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]")

@app.route("/submit-survey", methods=["POST"])
def submit_survey():
    data = request.get_json()
    print("Received Data:", data)

    voter_id = data.get("voter_id")
    responses = [data.get(str(i), None) for i in range(1, 13)]  # '1' to '12'
    print(responses)
    try:
        cursor = db.cursor()
        query = """
        INSERT INTO data (`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, voter_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(query, responses + [voter_id])
        db.commit()

        return jsonify({"message": "Survey submitted successfully"}), 200

    except mysql.connector.Error as err:
        print("MySQL Error:", err)
        return jsonify({"error": str(err)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)