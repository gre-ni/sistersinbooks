import csv
import sys
import re

def main():
    
    if len(sys.argv) != 2:
        sys.exit("Provide file to clean as command line argument.")

    try: 
        with open(f"raw/{sys.argv[1]}") as file:
            reader = csv.DictReader(file)
            books = [dict(row) for row in reader]         
        
    except FileNotFoundError:
        sys.exit("File not found.")
    
    year = f"{sys.argv[1]}".strip(".csv")
    
    for book in books:
        book["type"] = book["type"].strip().lower()
        title_author = re.split(r" by |, | - ", book["book"])
        book["title"] = title_author[0].strip()
        book["author"] = title_author[1].strip()
        date_parts = re.split(r"\.| - ", book["date"])
        book["date"] = f"{year}-{date_parts[1]}-{date_parts[0]}"
        del book["book"]
    
    with open(f"processed/{sys.argv[1]}", "w") as file:
        writer = csv.DictWriter(file, fieldnames=["title", "author", "type", "date", "rating"])
        for book in books:
            writer.writerow(
                {"title": book["title"], 
                 "author": book["author"], 
                 "type": book["type"], 
                 "date": book["date"], 
                 "rating": book["rating"]})

if __name__ == "__main__":
    main()