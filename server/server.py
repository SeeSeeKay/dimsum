from flask import Flask, render_template, request
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
cors = CORS(app, origins='*')

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'

# mysql = MySQL(app)

# cursor = mysql.connection.cursor()

# cursor.execute(''' CREATE TABLE role(id, name) ''')
# cursor.insert(''' INSERT INTO role VALUES('01', 'Admin')''')

# mysql.connection.commit()

# cursor.close()

# Members API route
@app.route("/members")
def members():
    return {"members":["Member1", "Member2"]}

if __name__ == "__main__":
    app.run(debug=True)