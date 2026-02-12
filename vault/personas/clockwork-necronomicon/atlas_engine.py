import os
import json
import subprocess
import platform
import glob

# --- CONFIGURATION ---
TARGET_DIR_NAME = "incoming"  # The folder where images live
CONFIG_DIR_NAME = "configs"   # The folder where JSONs live

# Get the absolute path of the script to ensure we look in the right place
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TARGET_DIR = os.path.join(BASE_DIR, TARGET_DIR_NAME)
CONFIG_DIR = os.path.join(BASE_DIR, CONFIG_DIR_NAME)

def load_cartridge():
    """Scans the config folder and lets the user pick a Reality."""
    if not os.path.exists(CONFIG_DIR):
        print(f"❌ CRITICAL ERROR: '{CONFIG_DIR}' folder missing.")
        return None

    cartridges = glob.glob(os.path.join(CONFIG_DIR, "*.json"))
    
    if not cartridges:
        print(f"❌ NO CARTRIDGES FOUND in {CONFIG_DIR}.")
        return None

    print("\n🔮 ATLAS INTERFACE: SELECT TRAVELER IDENTITY 🔮")
    print("="*50)
    for idx, cart in enumerate(cartridges):
        filename = os.path.basename(cart)
        print(f"{idx + 1}: {filename}")
    
    try:
        selection_input = input("\nSelect Identity ID > ")
        if not selection_input.strip(): return None 
        
        selection = int(selection_input) - 1
        if selection < 0 or selection >= len(cartridges): raise ValueError

        config_path = cartridges[selection]
        with open(config_path, 'r') as f:
            data = json.load(f)
            print(f"\n✔ REALITY LOADED: {data.get('traveler_name', 'Unknown')}")
            return data
            
    except (ValueError, IndexError):
        print("❌ Invalid Selection. Rebooting...")
        return None

def open_file(filepath):
    """Opens the image in the default OS viewer."""
    try:
        if platform.system() == 'Windows':
            os.startfile(filepath)
        elif platform.system() == 'Darwin':  # macOS
            subprocess.call(('open', filepath))
        else:  # Linux/WSL
            try:
                subprocess.call(('xdg-open', filepath))
            except FileNotFoundError:
                print(f"   (Preview: {os.path.basename(filepath)})")
    except Exception as e:
        print(f"Error opening file: {e}")

def run_atlas():
    # 1. LOAD THE REALITY
    config = load_cartridge()
    if not config: return

    prefix = config.get('file_prefix', 'atlas')
    nodes = config.get('nodes', {})
    traveler_name = config.get('traveler_name', 'Unknown Traveler')

    # 2. SCAN THE FILES
    if not os.path.exists(TARGET_DIR):
        print(f"❌ ERROR: Incoming folder not found at: {TARGET_DIR}")
        return

    # Valid image types
    valid_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp')
    
    # Get all files in incoming
    files = [f for f in os.listdir(TARGET_DIR) 
             if os.path.isfile(os.path.join(TARGET_DIR, f)) 
             and f.lower().endswith(valid_extensions)]
    
    # Filter out files already sorted with THIS prefix
    files_to_process = [f for f in files if not f.startswith(prefix + "_")]

    # --- DEBUG PRINT ---
    print(f"\n⚡ SYSTEM AUDIT: {len(files_to_process)} Unsorted Artifacts Detected ⚡")
    print(f"   Looking in: {TARGET_DIR}")
    print(f"   Filtering out prefix: {prefix}_")

    if len(files_to_process) == 0:
        print("   Mission Accomplished. No new artifacts found.")
        return

    input("Press ENTER to begin processing...")

    # 3. THE LOOP
    for filename in files_to_process:
        full_path = os.path.join(TARGET_DIR, filename)

        try:
            open_file(full_path)
        except Exception as e:
            pass

        # MENU
        print("\n" + "="*50)
        print(f"📂 ARTIFACT: {filename}")
        print(f"👤 PILOT: {traveler_name}")
        print("-" * 30)
        
        for key in sorted(nodes.keys()):
            print(f"{key}: {nodes[key]['desc']}")
            
        print("-" * 30)
        print("s: Skip | q: Quit")
        print("="*50)

        choice = input("Select Pathway > ").lower().strip()

        if choice == 'q':
            print("Aborted.")
            break
        elif choice == 's':
            print("Skipping...")
            continue
        
        if choice in nodes:
            tag = nodes[choice]['tag']
            new_filename = f"{prefix}_{tag}_{filename}"
            new_full_path = os.path.join(TARGET_DIR, new_filename)
            
            try:
                os.rename(full_path, new_full_path)
                print(f"✔ VERIFIED: Renamed to -> {new_filename}")
            except OSError as e:
                print(f"❌ ERROR: {e}")
        else:
            print("⚠ Invalid Pathway.")

if __name__ == "__main__":
    run_atlas()
