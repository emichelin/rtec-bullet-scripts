# rtec-bullet-scripts

Fichiers CSS/JS “Bullet-ready” pour injecter le comportement custom sur une page Bullet sans devoir rebuild.

## Fichiers à utiliser dans Bullet

- `dist/rtec-bullet.css`
- `dist/rtec-bullet.js` (sans balises `<script>`, prêt pour un `src=...`)

## Injection côté Bullet (recommandé)

### CSS

Ajoute dans le champ **Custom CSS / Head CSS** :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/<OWNER>/<REPO>@main/dist/rtec-bullet.css">
```

### JS

Ajoute dans le champ **Body end / Footer code** (ou équivalent) :

```html
<script defer src="https://cdn.jsdelivr.net/gh/<OWNER>/<REPO>@main/dist/rtec-bullet.js"></script>
```

> Astuce cache : remplace `@main` par un tag (`@v1.0.0`) pour figer une version.

## Développement

- Les fichiers sources actuels sont dans la racine (ex: `body.js`, `combined.css`).
- Les fichiers servis à Bullet sont dans `dist/`.

