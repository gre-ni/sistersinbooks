from datetime import date
from flask import Flask, render_template, redirect, request, jsonify
from flask_cors import CORS
from pathlib import Path
import sqlite3


app = Flask(__name__)
CORS(app) # Allow for comms with React on different port

# First .parent gives folder it sits in, second .parent gives me parent folder
DB_PATH = Path(__file__).parent.parent / "data" / "books.db"

# TODO: Endpoint which returns a list of all books in database
@app.route("/books", methods=["GET"])
def books():
    with sqlite3.connect(DB_PATH) as con:
        con.row_factory = sqlite3.Row
        db = con.cursor()
        result = db.execute("SELECT * FROM books").fetchall()
        return jsonify([dict(row) for row in result]), 201


# TODO: Endpoint which returns only two upcoming books, one classic and one modern:
@app.route("/books/upcoming")
def upcoming():
    today = date.today().isoformat()
    pass