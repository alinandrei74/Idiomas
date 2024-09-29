import re
import json

# Función para extraer las palabras en ruso
def extract_russian_words(text):
    # Expresión regular para encontrar palabras en cirílico (ruso)
    russian_words = re.findall(r'\b[А-Яа-яЁё]+\b', text)
    # Selecciona solo las palabras únicas
    unique_words = set(russian_words)
    return list(unique_words)

# Leer el archivo de texto
def read_text_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Guardar las palabras en un archivo JSON
def save_to_json(words, output_file):
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(words, json_file, ensure_ascii=False, indent=4)

# Archivo de entrada y salida
input_file = 'palabras.txt'  # Cambia esto por la ruta de tu archivo de texto
output_file = 'palabras_rusas.json'

# Leer el contenido del archivo
text = read_text_file(input_file)

# Extraer las palabras únicas en ruso
russian_words = extract_russian_words(text)

# Guardar las palabras en un archivo JSON
save_to_json(russian_words, output_file)

print(f'Se han guardado {len(russian_words)} palabras únicas en el archivo {output_file}.')
