from flask import Flask, render_template, request, send_file
import csv
import os

app = Flask(__name__)

CSV_FILE = "health_expenditure_data.csv"

if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            "Full Name", "Age", "Gender", "Contact", "Address",
            "Family History", "Medical History", "Diet", "Exercise",
            "Coverage Type", "Coverage Amount", "Illness Name",
            "Illness Start Date", "Illness End Date", "Expenditure"
        ])


@app.route('/')
def index():
    return render_template('manualform.html')


@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get("name")
    age = request.form.get("age")
    gender = request.form.get("gender")
    contact = request.form.get("contact")
    address = request.form.get("address")

    family_history = request.form.get("family_history")
    medical_history = request.form.get("medical_history")
    diet = request.form.get("diet")
    exercise = request.form.get("exercise")

    coverage_type = request.form.get("coverage_type")
    coverage_amount = request.form.get("coverage_amount")

    illness_names = request.form.getlist("illness_name[]")
    illness_start_dates = request.form.getlist("illness_start[]")
    illness_end_dates = request.form.getlist("illness_end[]")
    expenditures = request.form.getlist("expenditure[]")

    with open(CSV_FILE, mode='a', newline='') as file:
        writer = csv.writer(file)
        for i in range(len(illness_names)):
            writer.writerow([
                name, age, gender, contact, address,
                family_history, medical_history, diet, exercise,
                coverage_type, coverage_amount, illness_names[i],
                illness_start_dates[i], illness_end_dates[i], expenditures[i]
            ])
    return render_template("success.html")


@app.route('/download')
def download():
    return send_file(CSV_FILE, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
