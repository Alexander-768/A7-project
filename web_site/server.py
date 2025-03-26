from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import seaborn as sns
import numpy as np
import scipy.stats as stats
import statsmodels.formula.api as smf
import statsmodels.api
import statsmodels as sm

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    result = predict_of_survival(
        age=int(data['age']),
        nuber_of_class=int(data['class']),
        sex=data['sex']
    )
    return jsonify({'probability': result})

def predict_of_survival(age: int, nuber_of_class: int, sex: str):
    df = sns.load_dataset("titanic")
    sex = sex.lower()
    # Оставим нужные
    df0 = df[['survived', 'pclass', 'sex','age']]
    df = pd.get_dummies(data=df0, columns=['pclass'], drop_first=True)
    df2 = pd.get_dummies(data=df, columns=['sex'], drop_first=True)

    model_with_3_var = smf.glm('survived ~ sex_male + pclass_2 + pclass_3 + sex_male:pclass_2 + sex_male:pclass_3 + age', 
                              data=df2, family=statsmodels.api.families.Binomial()).fit()

    if nuber_of_class == 1:
        pclass_2 = False
        pclass_3 = False
    elif nuber_of_class == 2:
        pclass_2 = True
        pclass_3 = False
    else:
        pclass_2 = False
        pclass_3 = True
    
    if sex == 'мужской':
        sex_male = True
    else:
        sex_male = False
    
    new_data = pd.DataFrame({
        'age': [age], 
        'pclass_2': [pclass_2], 
        'pclass_3':[pclass_3], 
        'sex_male': [sex_male]
    })
    prob = model_with_3_var.predict(new_data)
    return round(float(prob[0])*100, 2)

if __name__ == '__main__':
    app.run(port=5000)