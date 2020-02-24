#! /usr/bin/python3

from lxml import etree
import json

def sortById (element):
    return element.attrib["id"] 

def convertToJson (input, output):
    data = etree.parse(input)
    root = data.getroot()
    games = list(root)

    outputFile = open(output, "w")

    # Ordenamos los elementos por id
    games.sort(key=sortById)
        
    jsonArray = []

    # Para cada lista, transformamos el elemento en el JSON deseado
    for game in games:
        jsonElement = {}
        
        jsonElement["titulo"] = game.attrib["title"]
        jsonElement["year"] = game.attrib["year"]
        jsonElement["distribuidor"] = game.attrib["dt"]
        jsonElement["desarrollador"] = game.attrib["dv"]
        jsonElement["img"] = game[0].attrib["src"]
        jsonElement["descripcion"] = game[1].text

        # La plataforma es un array
        platArray = []
        plats = game.attrib["type"].split(',')
        for plat in plats:
            platArray.append(plat.strip())

        jsonElement["plataforma"] = platArray

        # Reemplazamos la comillas simples por dobles
        # json = str(jsonElement).replace("'", '"')

        # Añadimos el json al array
        jsonArray.append(jsonElement)

    # Escribimos el array en el fichero
    outputFile.write("[")
    for index, jsonData in enumerate(jsonArray):
        outputFile.write(json.dumps(jsonData))
        if index < len(jsonArray) - 1:
            outputFile.write(',')
    outputFile.write("]")

# Declaramos las variables con los nombres de los ficheros a leer
inputData = "testData1.xml"
outputData = "resultTest1.json"

# Abrimos los ficheros
# inputF = open (inputData, "r")
# outputF = open (outputData, "w")

# Ejecutamos la transformacion de XML a JSON
convertToJson(inputData, outputData)

# Cerramos los ficheros
# inputF.close()
# outputF.close()