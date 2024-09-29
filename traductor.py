import json
import os
from openai import OpenAI
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar el cliente de OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def translate_words(words):
    translations = []
    for word in words:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Eres un traductor experto de ruso a español."},
                {"role": "user", "content": f"Traduce la siguiente palabra rusa al español: {word}"}
            ]
        )
        translation = response.choices[0].message.content.strip()
        translations.append({"russian": word, "spanish": translation})
    return translations

# Cargar las palabras rusas desde el archivo JSON
with open('palabras_rusas.json', 'r', encoding='utf-8') as file:
    russian_words = json.load(file)

# Traducir las palabras
translated_words = translate_words(russian_words)

# Guardar las traducciones en un nuevo archivo JSON
with open('translated_words.json', 'w', encoding='utf-8') as file:
    json.dump(translated_words, file, ensure_ascii=False, indent=2)

print("Traducción completada. Las palabras traducidas se han guardado en 'translated_words.json'.")