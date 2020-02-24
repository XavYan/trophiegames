#! /usr/bin/python3

def convertToJson (input, output):
    pass

# Declaramos las variables con los nombres de los ficheros a leer
inputData = "testData1.xml"
outputData = "resultTest1.json"

# Abrimos los ficheros
inputF = open (inputData, "r")
outputF = open (outputData, "w")

# Ejecutamos la transformacion de XML a JSON
convertToJson(inputF, outputF)

# Cerramos los ficheros
inputF.close()
outputF.close()