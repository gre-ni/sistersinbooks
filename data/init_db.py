import sqlite3
import csv

conn = sqlite3.connect("books.db")

conn.execute("""
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT,
        date TEXT,
        rating REAL,
        slug TEXT UNIQUE
    )
""")

with open("all-books.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        conn.execute("""
            INSERT INTO books (title, author, date, rating)
            VALUES (:title, :author, :date, :rating)
        """, row)
        print(row)

conn.commit()
conn.close()