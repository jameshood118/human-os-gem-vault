import json
from datetime import datetime, timezone

input_filename = 'data.json'
output_filename = 'data_sorted.json'

def parse_timestamp(item):
    """
    Normalizes mixed formats and ensures all datetimes are offset-aware
    to prevent 'naive vs aware' comparison errors.
    """
    ts_string = item.get('timestamp', "")
    if not ts_string or not isinstance(ts_string, str):
        # Earliest possible date for items with no timestamp
        return datetime.min.replace(tzinfo=timezone.utc)
    
    # 1. Standardize formatting (Space to T, Zulu to +00:00)
    clean_ts = ts_string.replace(' ', 'T').replace('Z', '+00:00')
    
    # 2. Handle Eastern Time suffixes (since you're in FL!)
    # fromisoformat doesn't like 'EST', it wants '-05:00'
    clean_ts = clean_ts.replace('EST', '-05:00').replace('EDT', '-04:00')
    
    try:
        dt = datetime.fromisoformat(clean_ts)
        
        # 3. Force "Naive" dates to be UTC-aware so they can be compared
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except ValueError:
        # If it still fails, put it at the start of the list
        return datetime.min.replace(tzinfo=timezone.utc)

def run_sort():
    try:
        with open(input_filename, 'r') as f:
            raw_data = json.load(f)

        # --- THE FLATTENER ---
        # Your data has 325 objects, then a single list containing ~1,400 more!
        # We need to unpack that list to sort every individual log.
        flattened_data = []
        for item in raw_data:
            if isinstance(item, list):
                flattened_data.extend(item)
            else:
                flattened_data.append(item)
        
        print(f"System Audit: Flattened {len(raw_data)} entries into {len(flattened_data)} total objects.")

        # --- THE SORT ---
        flattened_data.sort(key=parse_timestamp)

        with open(output_filename, 'w') as f:
            json.dump(flattened_data, f, indent=4)
            
        print(f"Success! Chronological log created: {output_filename}")
        print(f"Earliest: {flattened_data[0]['timestamp']}")
        print(f"Latest:   {flattened_data[-1]['timestamp']}")

    except Exception as e:
        print(f"Well, shit (v4): {e}")

if __name__ == "__main__":
    run_sort()