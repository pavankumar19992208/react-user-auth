from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Helper function to execute SQLite queries
def execute_query(query, parameters=()):
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    cursor.execute(query, parameters)
    conn.commit()
    conn.close()

# Create the 'users' table if it doesn't exist
execute_query('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )
''')

# Route to handle user registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    password = data.get('password')

    # Perform user registration (insert data into the 'users' table)
    execute_query("INSERT INTO users (name, username, password) VALUES (?, ?, ?)", (name, username, password))

    return jsonify({'message': 'Registration successful'})

# Route to handle user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Perform user authentication (check if the username and password match)
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Login failed. Invalid username or password'})

if __name__ == '__main__':
    app.run(debug=True)
