import csv
import sqlite3

with sqlite3.connect("books.db") as con, open("all-books.csv") as f:
    con.row_factory = sqlite3.Row
    db = con.cursor()
    reader = csv.DictReader(f)
    
    for row in reader:
        db.execute("UPDATE books SET type = ? WHERE title = ?", (row["type"], row["title"]))