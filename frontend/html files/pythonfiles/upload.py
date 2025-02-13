import cgi
import os
import pandas as pd
from urllib.parse import urlencode

form = cgi.FieldStorage()

if "file" in form:
    file_item = form["file"]

    if file_item.filename:
        filename = os.path.basename(file_item.filename)
        filepath = f"./uploads/{filename}"
        
        with open(filepath, "wb") as f:
            f.write(file_item.file.read())

        df = pd.read_csv(filepath)
        summary = df.describe().to_html()

        print("Content-Type: text/html")
        print(f"Location: uploadedresults.html?{urlencode({'summary': summary})}")
        print()
    else:
        print("Content-Type: text/html")
        print()
        print("<h2>No file uploaded. Please try again.</h2>")
else:
    print("Content-Type: text/html")
    print()
    print("<h2>Error: No file received.</h2>")
