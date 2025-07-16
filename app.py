from flask import Flask, render_template, request, redirect, session, url_for
import pandas as pd

app = Flask(__name__)
app.secret_key = 's1b8@5400#we'  



USERNAME = "root"
PASSWORD = "admin@123"

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if username == USERNAME and password == PASSWORD:
            session['logged_in'] = True
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error="Invalid username or password")

    return render_template('login.html')



@app.route('/dashboard', methods=['GET'])
def dashboard():
    df = pd.read_csv('students.csv')
    df.columns = df.columns.str.strip().str.lower()

    df = df.dropna(subset=['name', 'department', 'faculty'])
    df = df.drop_duplicates()
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

    def map_activation(val):
        if pd.isna(val) or str(val).upper() == 'NULL' or val == '':
            return 'Inactive'
        else:
            return 'Active'
    df['activation'] = df['activation'].apply(map_activation)

    department_data = df['department'].value_counts().to_dict()
    designation_data = df['designation'].value_counts().to_dict()
    activation_data = df['activation'].value_counts().to_dict()

    
    total_employees = len(df)

    search_query = request.args.get('search', '').strip()
    if search_query:
        filtered_df = df[df['employee_no'].astype(str) == search_query]
    else:
        filtered_df = pd.DataFrame(columns=df.columns)

    students = filtered_df.to_dict(orient='records')

    return render_template(
        'dashboard.html',
        department_data=department_data,
        designation_data=designation_data,
        activation_data=activation_data,
        students=students,
        search_query=search_query,
        total_employees=total_employees 
    )



@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
