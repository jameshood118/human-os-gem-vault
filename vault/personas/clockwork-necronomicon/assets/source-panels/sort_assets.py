import os
import subprocess
import platform

# --- CONFIGURATION ---
target_directory = "."
files_to_ignore = ["sort_assets.py", ".DS_Store", "README.md", "persona-matrix.md"]

# --- THE NARRATIVE MENU ---
def print_menu(filename):
    print("\n" + "="*50)
    print(f"📂 PROCESSING ARTIFACT: {filename}")
    print("="*50)
    print("WHOSE REALITY IS THIS?")
    print("-" * 30)
    print("1: [PRIME]   The Glitch / AR Gamer / 'Only I see this'")
    print("2: [ADMIN]   The Patch / Professional / 'Hide the weird'")
    print("3: [ROOT]    The Sage / Systems View / 'It connects'")
    print("-" * 30)
    print("4: [SHIELD]  The Protector (Em/Family)")
    print("5: [SENTINEL] The Guard (Rita/Security)")
    print("6: [PARADOX] The Conflict (When they fight)")
    print("9: [WHOKER]  The Shadow (The version that didn't evolve)")
    print("-" * 30)
    print("s: Skip (Not ready to sort)")
    print("q: Quit (End Session)")
    print("="*50)

def open_file(filepath):
    """Opens the file in the default OS viewer."""
    if platform.system() == 'Windows':
        os.startfile(filepath)
    elif platform.system() == 'Darwin':  # macOS
        subprocess.call(('open', filepath))
    else:  # Linux
        subprocess.call(('xdg-open', filepath))

def sort_images():
    files = [f for f in os.listdir(target_directory) if os.path.isfile(f)]
    count = len(files)
    
    print(f"\n⚡ SYSTEM AUDIT INITIATED: {count} FILES DETECTED ⚡")
    print("Press ENTER to begin the sort...")
    input()

    for filename in files:
        # Skip system files or already sorted files
        if filename in files_to_ignore or filename.startswith("ue_"):
            continue
            
        # Open the image
        try:
            open_file(filename)
        except Exception as e:
            print(f"⚠ ERROR: Could not open {filename}: {e}")

        # Show the Menu
        print_menu(filename)
        
        # Get Input
        choice = input("Select Neural Pathway > ").lower().strip()
        
        # Logic Switch
        if choice == 'q':
            print("System Audit Aborted. Saving State...")
            break
        elif choice == 's':
            print("Skipping artifact...")
            continue
        
        tag_map = {
            '1': 'v1_prime', 
            '2': 'v2_admin', 
            '3': 'v3_root', 
            '4': 'v4_shield', 
            '5': 'v5_sentinel', 
            '6': 'v6_paradox',
            '9': 'v9_whoker'
        }
        
        # Rename Logic
        if choice in tag_map:
            new_name = f"ue_{tag_map[choice]}_{filename}"
            try:
                os.rename(filename, new_name)
                print(f"✔ INTEGRATED: {new_name}")
            except OSError as e:
                print(f"❌ ERROR: File locked or permission denied. {e}")
        else:
            print("⚠ Invalid Input. Artifact skipped.")

if __name__ == "__main__":
    sort_images()