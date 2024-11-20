import tensorflow as tf
from tensorflow.keras import datasets, layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import numpy as np

train_dir = r'C:\Users\naomi\upx_cinco\Scripts\dataset\treinamento'
test_dir = r'C:\Users\naomi\upx_cinco\Scripts\dataset\teste'

train_datagen = ImageDataGenerator(
    rescale=1./255,          # Normalização
    rotation_range=20,       # Rotação aleatória
    width_shift_range=0.2,   # Deslocamento horizontal
    height_shift_range=0.2,  # Deslocamento vertical
    
    shear_range=0.2,        # Cortes
    zoom_range=0.2,         # Zoom
    horizontal_flip=True,    # Espelhar horizontalmente
    fill_mode='nearest'      # Modo de preenchimento
)

test_datagen = ImageDataGenerator(rescale=1./255)  

train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(32, 32),  # Redimensionar as imagens
    batch_size=32,
    class_mode='categorical'  # Se você tem múltiplas classes
)

test_generator = test_datagen.flow_from_directory(
    test_dir,
    target_size=(32, 32),
    batch_size=32,
    class_mode='categorical'
)

model = models.Sequential()
model.add(layers.Input(shape=(32, 32, 3)))
model.add(layers.Conv2D(32, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(len(train_generator.class_indices), activation='softmax'))  # Número de classes

# Compilar o modelo
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Treinar o modelo
history = model.fit(train_generator, epochs=10, validation_data=test_generator)


# Avaliar o modelo
test_loss, test_acc = model.evaluate(test_generator, verbose=2)
print(f'\nAcurácia no conjunto de teste: {test_acc*100:.2f}%')

# Para prever uma nova imagem
from tensorflow.keras.preprocessing import image
import numpy as np

# Função para carregar e preprocessar uma nova imagem
def load_and_preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(32, 32))  # Redimensionar
    img_array = image.img_to_array(img) / 255.0  # Normalizar
    img_array = np.expand_dims(img_array, axis=0)  # Adicionar dimensão do lote
    return img_array

# Exemplo de previsão
img_path = r'C:\Users\naomi\OneDrive\Pictures\WhatsApp Image 2024-10-01 at 19.06.33.jpeg'
img = load_and_preprocess_image(img_path)
predictions = model.predict(img)
predicted_class = np.argmax(predictions)

# Mostrar o resultado
print(f'Classe prevista: {list(train_generator.class_indices.keys())[predicted_class]}')

confidence = np.max(predictions) * 100  # Multiplicar por 100 para obter a porcentagem
print(f'Confiança: {confidence:.2f}%')