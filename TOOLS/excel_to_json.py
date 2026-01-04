#!/usr/bin/env python3
"""
Convertisseur Excel vers JSON pour la configuration du modal
Usage: python3 excel_to_json.py modal-config-master.xlsx
"""

import pandas as pd
import json
import sys

def parse_comma_separated(value):
    """Convertit une chaîne séparée par des virgules en liste"""
    if pd.isna(value) or value == "":
        return []
    return [item.strip() for item in str(value).split(',')]

def excel_to_json(excel_file):
    """Convertit le fichier Excel en JSON"""
    
    # Lire le fichier Excel
    df = pd.read_excel(excel_file, sheet_name='Configuration', header=None)
    
    config = {
        "instruments": {},
        "modules": {},
        "temps": {},
        "envs": {},
        "sensors": {},
        "sensorCodes": {},
        "specific": {}
    }
    
    # Variables pour suivre où on est dans le fichier
    current_section = None
    headers = []
    
    for idx, row in df.iterrows():
        first_cell = str(row[0]).strip() if pd.notna(row[0]) else ""
        
        # Détecter les sections principales
        if first_cell == "INSTRUMENTS":
            current_section = "INSTRUMENTS"
            continue
        elif first_cell == "MODULES":
            current_section = "MODULES"
            continue
        elif first_cell == "LABELS":
            current_section = "LABELS"
            continue
        elif first_cell == "TEMPS":
            current_section = "TEMPS"
            continue
        elif first_cell == "ENVS":
            current_section = "ENVS"
            continue
        elif first_cell == "SENSORS":
            current_section = "SENSORS"
            continue
        elif first_cell == "SPECIFIC":
            current_section = "SPECIFIC"
            continue
        
        # Sauter les lignes vides
        if first_cell == "" or first_cell == "nan":
            continue
        
        # Parser selon la section
        if current_section == "INSTRUMENTS":
            if first_cell == "Code":
                headers = [str(cell).strip() for cell in row[:4] if pd.notna(cell)]
                continue
            
            code = str(row[0]).strip()
            name = str(row[1]).strip()
            modules = parse_comma_separated(row[2])
            specific = parse_comma_separated(row[3])
            
            config["instruments"][code] = {
                "name": name,
                "modules": modules,
                "specific": specific
            }
        
        elif current_section == "MODULES":
            if first_cell == "Code":
                continue
            
            code = str(row[0]).strip()
            name = str(row[1]).strip()
            temps = parse_comma_separated(row[2])
            envs = parse_comma_separated(row[3])
            sensors = parse_comma_separated(row[4])
            
            config["modules"][code] = {
                "name": name,
                "temps": temps,
                "envs": envs,
                "sensors": sensors
            }
        
        elif current_section == "TEMPS":
            code = str(row[0]).strip()
            name = str(row[1]).strip()
            config["temps"][code] = name
        
        elif current_section == "ENVS":
            code = str(row[0]).strip()
            name = str(row[1]).strip()
            config["envs"][code] = name
        
        elif current_section == "SENSORS":
            if first_cell == "Code":
                continue
            
            code = str(row[0]).strip()
            name = str(row[1]).strip()
            sensor = str(row[2]).strip() if pd.notna(row[2]) and row[2] != "" else None
            range_val = str(row[3]).strip() if pd.notna(row[3]) and row[3] != "" else None
            
            config["sensors"][code] = name
            config["sensorCodes"][code] = {
                "sensor": sensor,
                "range": range_val
            }
        
        elif current_section == "SPECIFIC":
            code = str(row[0]).strip()
            name = str(row[1]).strip()
            config["specific"][code] = name
    
    return config

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 excel_to_json.py modal-config-master.xlsx")
        sys.exit(1)
    
    excel_file = sys.argv[1]
    output_file = excel_file.replace('.xlsx', '.json')
    
    print(f"🔄 Converting {excel_file} to JSON...")
    
    try:
        config = excel_to_json(excel_file)
        
        # Sauvegarder en JSON
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        
        print(f"✅ JSON created: {output_file}")
        print(f"\n📊 Summary:")
        print(f"   - {len(config['instruments'])} instruments")
        print(f"   - {len(config['modules'])} modules")
        print(f"   - {len(config['temps'])} temperature conditions")
        print(f"   - {len(config['envs'])} environment conditions")
        print(f"   - {len(config['sensors'])} sensors")
        print(f"   - {len(config['specific'])} specific options")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
