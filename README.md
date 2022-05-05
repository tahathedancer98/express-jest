# express-jest

Commandes à essayée

```
http GET localhost:3000/public/html/500.html
http GET localhost:3000/public/style.css
http GET localhost:3000/public/alert.js
```

Commandes à tester avec chacun des fichiers pour constater
- soit l'absence de PARSE lorsqu'on ne met pas le middlewar
- soit le fait qu'on arrive à PARSER le json avec le middleware
```
http POST localhost:3000 hello=World valeur=2

http --form localhost:3000 hello=World valeur=2

```

Pour le dossier 05-PARSE-URL-ARGUMENTS
```
http get :3000/hey/blala/hey2
```
Notez que le nombre n'a pas été converti en nombres (il est sous forme deString.
