# Representation textuelle des niveaux.
## 1. HIERARCHIE
Tout est representé dans un objet `CONFIG` qui est un objet qui possède un champ `levels`. Ce champ contient comme valeur une liste contenant des objets. Chaque objet concerne un niveau et represente ses obstacles, ses ressources, ....
### 1.a Obstacles
Pour chaque niveau, les obstacles sont représentés dans une liste. Chaque element est un unique obstacle dont les champs representent le type d'obstacles (rectangle | triangle | ...) c'est à dire sa forme géométrique et les dimensions sur le canvas (position, tailles).

### 1.b Ressource


## 2. Ajout d'un niveau supplémentaire