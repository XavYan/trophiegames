#! /usr/bin/python3

import os

# Ficheros que no se deben editar
not_editable = ["plantilla.html", "signin.html", "login.html", "perfil.html"]

# Obtenemos el header y el footer de la plantilla
plantilla = open("plantilla.html", "r")
plantContent = plantilla.read()

plantBeginHeaderIndex = plantContent.find("<header>")
plantEndHeaderIndex = plantContent.find("</header>", plantBeginHeaderIndex) + len("</header>") - 1

plantBeginFooterIndex = plantContent.find('<footer class="footer">')
plantEndFooterIndex = plantContent.find("</footer>", plantBeginFooterIndex) + len("</footer>") - 1

plantHeader = plantContent[plantBeginHeaderIndex:plantEndHeaderIndex+1]
plantFooter = plantContent[plantBeginFooterIndex:plantEndFooterIndex+1]

# Obtenemos todos los ficheros HTML del proyecto
filenames = []

for root, dirs, files in os.walk('.'):
    for filename in files:
        if os.path.splitext(filename)[1] == ".html" and not filename in not_editable:
            filenames.append(filename)

for filename in filenames:
    fileData = open(filename, "r")
    data = fileData.read()

    # Header
    beginHeaderIndex = data.find("<header>")
    endHeaderIndex = data.find("</header>", beginHeaderIndex) + len("</header>") - 1

    # Footer
    beginFooterIndex = data.find('<footer class="footer">')
    endFooterIndex = data.find("</footer>", beginFooterIndex) + len("</footer>") - 1

    finalFile = data[:beginHeaderIndex-1] + plantHeader + data[endHeaderIndex+1:beginFooterIndex] + plantFooter + data[endFooterIndex+1:]

    # Sustituimos el header y el footer antiguo por el nuevo
    fileData.close()
    fileData = open(filename, "w")
    fileData.write(finalFile)