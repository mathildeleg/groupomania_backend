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

Si vous souhaitez ajouter un administrateur, vous pouvez utiliser mySQL Workbench ainsi (en ajoutant, à la place du 28, l'id de l'utilisateur que vous avez crée pour ce compte admin, que vous trouverez dans la table "User"):
```INSERT INTO `db_groupomania`.`Administrator` (`adminId`, `userId`) VALUES ('', '28');```

Repository du front-end :
https://github.com/mathildeleg/groupomania_frontend
