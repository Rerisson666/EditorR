from flask import Blueprint, request, send_file, session
import pandas as pd
from io import BytesIO

main = Blueprint('main', __name__)

@main.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    df = None
    if file.filename.endswith('.csv'):
        df = pd.read_csv(file)
    elif file.filename.endswith('.xlsx'):
        df = pd.read_excel(file)
    elif file.filename.endswith('.txt'):
        df = pd.read_csv(file, delimiter='\t')
    
    if df is not None:
        session['dataframe'] = df.to_dict()
        return {"message": "File uploaded successfully"}, 200
    else:
        return {"message": "Unsupported file format"}, 400

@main.route('/data', methods=['GET'])
def get_data():
    df = pd.DataFrame(session['dataframe'])
    return df.to_json(orient='split'), 200

@main.route('/modify', methods=['POST'])
def modify_data():
    data = request.json
    df = pd.DataFrame(session['dataframe'])

    if 'remove_columns' in data:
        df.drop(columns=data['remove_columns'], inplace=True)
    if 'add_columns' in data:
        for col in data['add_columns']:
            df[col] = ''

    session['dataframe'] = df.to_dict()
    return {"message": "Data modified successfully"}, 200

@main.route('/export', methods=['POST'])
def export_file():
    data = request.json
    df = pd.DataFrame(session['dataframe'])
    output = BytesIO()

    if data['format'] == 'csv':
        df.to_csv(output, index=False)
        output.seek(0)
        return send_file(output, mimetype='text/csv', as_attachment=True, attachment_filename='export.csv')
    elif data['format'] == 'xlsx':
        df.to_excel(output, index=False)
        output.seek(0)
        return send_file(output, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', as_attachment=True, attachment_filename='export.xlsx')
    elif data['format'] == 'txt':
        df.to_csv(output, sep='\t', index=False)
        output.seek(0)
        return send_file(output, mimetype='text/plain', as_attachment=True, attachment_filename='export.txt')
    
    return {"message": "Unsupported export format"}, 400
