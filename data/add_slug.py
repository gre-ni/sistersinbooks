import sqlite3

con = sqlite3.connect("books.db")

# Wraps each row by an object to let me access via column names:
con.row_factory = sqlite3.Row

reader = con.cursor()
writer = con.cursor()

for row in reader.execute("SELECT title, slug FROM books"): 
    name = row["title"]
    name = name.lower().replace(" ", "_")
    writer.execute("UPDATE books SET slug = ? WHERE title = ?", (name, row["title"]))
    
con.commit()
con.close()