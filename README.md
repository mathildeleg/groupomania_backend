OC - Projet 7 : Créez un réseau social d'entreprise
_Front-end_

L'objectif de ce projet est de réaliser le back-end et le front-end d'un réseau social d'entreprise pour l'entreprise Groupomania.

Pour installer le back-end :
- cloner le repository,
- lancer la commande suivante :
    - ```npm install```
- créer une database mySQL en local (outil conseillé : mySQL Workbench),
- créer un fichier .env selon le template avec les données requises :
    - DATABASE_URL : url d'une base de données mySQL, exemple : "mysql://root:motdepasse@localhost:3306/nombasededonnées",
    - JWT_PRIVATE_KEY : chaîne de caractères, idéalement une clé SHA-1 ou MD5.
- lancer les commandes suivantes :
    - ```npx prisma generate```
(pour générer les outils prisma dans node_modules),
    - ```npx prisma migrate dev```
- lancer le serveur avec la commande suivante :
    - ```npm run start```
- installer le front-end pour accéder au site

Repository du front-end :
https://github.com/mathildeleg/groupomania_frontend
