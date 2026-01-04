# 📊 Configuration Modal - Excel Master

## 🎯 Fichier principal: `modal-config-master.xlsx`

Un seul fichier Excel, une seule feuille, tout dedans !

### 📋 Structure

Le fichier contient **3 sections principales** :

#### 1️⃣ **INSTRUMENTS**
```
Code | Name      | Modules            | Imaging
-----|-----------|-------------------|------------------
mft5 | MFT-5000  | stat,rota,reci... | lamb,sigm,delt
```

#### 2️⃣ **MODULES**
```
Code  | Name         | Temps          | Envs        | Sensors
------|--------------|----------------|-------------|------------------
stat  | Stationary   | heat,cool,...  | liq,dry     | ull,ll,ml,...
```

#### 3️⃣ **LABELS** (Temps, Envs, Sensors, Imaging)
```
Code  | Name
------|------------------
heat  | Heated
liq   | Liquid
ml    | Medium Load Argon
lamb  | Lambda Imaging
```

---

## ✏️ Comment modifier

1. **Ouvre `modal-config-master.xlsx`**
2. **Modifie directement dans Excel** :
   - Ajoute une ligne pour un nouvel instrument
   - Change un nom
   - Ajoute un module à un instrument (sépare par des virgules)
3. **Sauvegarde**
4. **Convertis en JSON** :
   ```bash
   python3 excel_to_json.py modal-config-master.xlsx
   ```
5. **C'est tout !** Le fichier `modal-config-master.json` est créé

---

## 🚀 Utilisation

### Méthode 1 : Conversion manuelle
```bash
# Après modification de l'Excel
python3 excel_to_json.py modal-config-master.xlsx

# Upload le JSON sur GitHub
git add modal-config-master.json
git commit -m "Update config"
git push
```

### Méthode 2 : Utilisation directe
```javascript
// Dans ton code, charge le JSON
fetch('modal-config-master.json')
  .then(r => r.json())
  .then(config => {
    // Utilise config.instruments, config.modules, etc.
  });
```

---

## 📝 Exemples de modifications

### Ajouter un instrument
Dans la section **INSTRUMENTS**, ajoute une ligne :
```
new1 | New-1000 | stat,rota | lamb,sigm
```

### Ajouter un module à un instrument
Modifie la colonne **Modules** :
```
mft5 | MFT-5000 | stat,rota,reci,NEW_MODULE | lamb,sigm,delt
```

### Créer un nouveau module
Dans la section **MODULES**, ajoute une ligne :
```
newmod | New Module | heat,cool | liq,dry | ml,hl
```

### Modifier un label
Dans la section **LABELS > TEMPS** :
```
heat | Super Heated  ← Change juste le nom
```

---

## 🔄 Format des données

### Listes (séparées par virgules)
```
stat,rota,reci          → ["stat", "rota", "reci"]
lamb,sigm,delt          → ["lamb", "sigm", "delt"]
```

### Vide (pas de données)
```
                        → []
```

### Codes sensors → JSON
```
Code | Name              | Sensor | Range
-----|-------------------|--------|-------
ml   | Medium Load Argon | 2d     | ml

Devient :
{
  "sensors": {
    "ml": "Medium Load Argon"
  },
  "sensorCodes": {
    "ml": {
      "sensor": "2d",
      "range": "ml"
    }
  }
}
```

---

## ⚠️ Règles importantes

1. **Ne pas toucher aux titres de sections** (INSTRUMENTS, MODULES, LABELS)
2. **Ne pas modifier l'ordre des colonnes**
3. **Utiliser des virgules sans espaces** : `stat,rota,reci` ✅ pas `stat, rota, reci` ❌
4. **Les codes doivent être uniques** (pas de doublons)
5. **Laisser vide si pas de données** (pas de "N/A" ou "none")

---

## 🎨 Avantages

✅ **Un seul fichier** - Facile à envoyer/partager  
✅ **Lisible** - Format tableau comme Word  
✅ **Modifiable facilement** - Dans Excel directement  
✅ **Pas de compétences techniques** - Juste sauvegarder et convertir  
✅ **Versionnable** - Git track les changements  
✅ **Convertible** - Script Python inclus  

---

## 🛠️ Dépendances

Pour le script de conversion :
```bash
pip install pandas openpyxl --break-system-packages
```

---

## 📞 Questions fréquentes

**Q: Je peux supprimer une ligne ?**  
R: Oui, supprime la ligne entière dans Excel.

**Q: Je peux réordonner les lignes ?**  
R: Oui, l'ordre n'a pas d'importance.

**Q: Je dois respecter la casse (majuscules/minuscules) ?**  
R: Oui pour les codes ! `mft5` ≠ `MFT5`

**Q: Je peux ajouter des colonnes ?**  
R: Non, le script ne les lira pas. Modifie d'abord le script si besoin.

**Q: Combien de temps pour convertir ?**  
R: ~1 seconde

---

C'est tout ! Modifie, sauvegarde, convertis. Simple. 🎉
