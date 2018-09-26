# Description du projet
Dans un premier temps, merci pour ton temps aujourd’hui et merci de ton intérêt envers Rum&Code !
Comme convenu, voici un petit résumé du Take Home Project.

En utilisant React-Native ( https://facebook.github.io/react-native/docs/getting-started.html ) ou ReactJS ( https://reactjs.org/ ), j'aimerais avoir une page d'un catalogue de Avengers.

Les informations suivantes doivent s'y retrouver :
- Une photo de l'Avengers qui occupe le tiers de la page
- Le nom du superhéros (i.e.: Iron Man)
- Sa véritable identité (Tony Stark)
- Son âge
- Une description de ses pouvoirs et de sa biographie ( peut être du Lorem Ipsum : http://www.lipsum.com/ )

Voici le genre de layout que j'ai en tête : https://material.uplabs.com/posts/marvel-avengers-app-animation-concept
Si tu veux utiliser de vraies données, tu peux te référer à http://developer.marvel.com/

Comme on te l'a déjà mentionné, met l'accent sur ce qui t'importe le plus.

Si tu as du Picasso en toi, tu peux absolument faire des mocks de données et mettre l'accent sur le rendu artistique.
Si au contraire, t'es plus proche des algorithmes que des couleurs et du CSS, focus sur l'optimisation et l'acquisition de données.

# Fonctionnalités intéressantes implémentées
- Chargement automatique de personnages supplémentaires lorsque l'on arrive au bas de la page
- Choix dynamique des couleurs sur les pages de personnages à partir de l'image des personnages
- Menu "Mes Avengers" que l'on peut remplir avec les personnages de son choix

# Déploiement
1. `yarn build`
2. `cp package*.json build/`
3. `cd build/`
4. `docker build take-home-marvel .`
5. `docker run -d -p 80:5000 take-home-marvel`
6. `http://ec2-18-224-109-31.us-east-2.compute.amazonaws.com/`
