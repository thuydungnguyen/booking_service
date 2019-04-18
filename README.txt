README

IMPORTANT : inclure le fichier .env dans le repot qu'on veut utiliser

I. Préparation
	1. Installer typescript en faisant : npm install typescript -g
	2. Entrer dans un repot
	3. Installer les librairies en faisant : npm install

II. LANCEMENT
	1. Ouvrer un terminal avec le chemin du repot
	2. taper : tsc -w (cette commande va compiler le code de ts vers js)
	3. Ouvrer un autre terminal avec le chemin du repot
	4. taper : node build/index.js (cette commande va lancer l'api)

III. ACCES API
	1. Pour accéder au api en local, utiliser l'url suivante: http://localhost:5757/URL_ROUTES
	2. Une documentation est disponible: http://localhost:5757/api-documentation/#/