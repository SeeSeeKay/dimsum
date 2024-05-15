# from flask import Flask, render_template, request
# from flask_mysqldb import MySQL

# app = Flask(__name__)

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'flask'

# mysql = MySQL(app)

# cursor = mysql.connection.cursor()

# cursor.execute(''' CREATE TABLE role(id, name) ''')

# mysql.connection.commit()

# cursor.close()