import csv
import sqlite3

with sqlite3.connect("books.db") as con, open("books.csv") as f:
    con.row_factory = sqlite3.Row
    db = con.cursor()
    reader = csv.DictReader(f)