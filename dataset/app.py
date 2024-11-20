import os
from flask import Flask, request, render_template, redirect, url_for
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from werkzeug.utils import secure_filename

# Configurações
UPLOAD_FOLDER = 'static/uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Inicializar a aplicação Flask
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Carregar o modelo treinado
model = load_model('modelo_classificacao_animais.h5')

# Mapeamento de classes
class_indices = {'mamiferos': 0, 'peixes': 1, 'plantas': 2}
indice_para_classe = {v: k for k, v in class_indices.items()}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(32, 32))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    classe_predita = None
    confianca = None
    nome_imagem = None
    if request.method == 'POST':
        # Verificar se o post request tem a parte do arquivo
        if 'imagem' not in request.files:
            return redirect(request.url)
        file = request.files['imagem']
        # Se o usuário não selecionar um arquivo, o navegador também
        # envia um arquivo sem nome
        if file.filename == '':
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            caminho_completo = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(caminho_completo)
            # Pré-processar a imagem
            img = preprocess_image(caminho_completo)
            # Fazer a previsão
            predictions = model.predict(img)
            predicted_class = np.argmax(predictions)
            confidence = np.max(predictions) * 100
            classe_predita = indice_para_classe[predicted_class]
            confianca = f"{confidence:.2f}"
            nome_imagem = filename
    return render_template('index.html', classe_predita=classe_predita, confianca=confianca, nome_imagem=nome_imagem)

if __name__ == '__main__':
    # Criar a pasta de uploads se não existir
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=False)
