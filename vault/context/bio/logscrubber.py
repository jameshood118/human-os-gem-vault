#!/usr/bin/env python3
import json
import re
from html import escape

# --- 1. CONFIGURATION: THE PII FIREWALL ---
# Add specific names, street addresses, or nodes here.
PII_MAP = {
    "Mr. Zorn": "[INSTITUTIONAL_NODE]",
    "Kyle": "[PEER_NODE_ALPHA]",
    "Steven": "[KINSHIP_NODE_BETA]",
    "Gary Cage": "[CORPO_NODE_MANAGEMENT]",
    "April Drake": "[VERIFIED_PEER_AD]",
    "Nick Licata": "[VERIFIED_PEER_NL]",
    "Mark Harling": "[VERIFIED_PEER_MH]",
    "Bryant Poston": "[LEGACY_PEER_BP]",
    "500 W Montana": "[REDACTED_SECTOR_HOME]",
    "Bonifay Elementary": "[EDUCATIONAL_NODE_08]",
    "500 W Montana Ave": "[REDACTED_SECTOR_HOME]",
    "540 Carillon Pkwy": "[FOB_CARILLON_LOCATION]",
    "Oak Hill Elementary": "[EDUCATIONAL_NODE_07]",
    "Holmes County High School": "[EDUCATIONAL_NODE_09]"
}

def scrub_text(text):
    if not isinstance(text, str): return str(text)

    # Hardened Regex Scrubbing
    for pii_pattern, replacement in PII_MAP.items():
        # Case-insensitive replacement of any match
        text = re.sub(pii_pattern, replacement, text, flags=re.IGNORECASE)

    return text

# --- 2. LOAD IMMUTABLE SOURCE ---
with open('captains_log.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    entries = data.get("entries", [])

# --- 3. BUILD XML ARCHITECTURE ---
xml_output = """<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
    xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
    <title>The Verified Generalist: Captain's Logs</title>
    <link>https://jameshood118.substack.com</link>
    <description>Immutable historical record of the Sovereign Pilot.</description>
    <wp:wxr_version>1.2</wp:wxr_version>
"""

# --- 4. COMPILE ENTRIES ---
for entry in entries:
    subject = scrub_text(entry.get("subject", "James"))
    cat = entry.get("category", "SYSTEM_LOG")
    primary = scrub_text(entry.get("primary_data", ""))
    secondary = scrub_text(entry.get("secondary_data", ""))
    location = scrub_text(entry.get("location", "Unknown"))
    timestamp = entry.get("timestamp", "")

    # Process Analytical Perspectives from Metadata
    perspectives = entry.get("metadata", {}).get("analytical_perspectives", [])
    perspective_block = ""
    if perspectives:
        perspective_block = "<h3>SYSTEM AUDIT & PERSPECTIVES</h3><ul>"
        for p in perspectives:
            perspective_block += f"<li>{escape(scrub_text(p))}</li>"
        perspective_block += "</ul>"

    # Assemble Body
    body = f"<strong>STATUS:</strong> {cat}<br>"
    body += f"<strong>LOCATION:</strong> {location}<br><br>"
    body += f"{primary}<br><br>"
    if secondary:
        body += f"<strong>SECONDARY TELEMETRY:</strong><br>{secondary}<br><br>"
    body += perspective_block
    body += f"<hr><em>[SYS-LOG ID: {entry.get('id')} | THREAT: {entry.get('metadata', {}).get('threat_level', 'NOMINAL')}]</em>"

    # Build Tags
    tag_xml = ""
    for tag in entry.get("tags", []):
        tag_xml += f'<category domain="post_tag" nicename="{tag.strip("#").lower()}"><![CDATA[{tag}]]></category>\n'

    # Build XML Item
    xml_output += f"""
    <item>
        <title>[CAPTAINS-LOG] {escape(entry.get('id'))}: {escape(scrub_text(entry.get('subject')))}</title>
        <pubDate>{timestamp}</pubDate>
        <dc:creator><![CDATA[James Hood]]></dc:creator>
        <content:encoded><![CDATA[{body}]]></content:encoded>
        <wp:post_date><![CDATA[{timestamp}]]></wp:post_date>
        <wp:status><![CDATA[publish]]></wp:status>
        <wp:post_type><![CDATA[post]]></wp:post_type>
        {tag_xml}
    </item>
    """

xml_output += "</channel></rss>"

with open('Captains_Log_Final.xml', 'w', encoding='utf-8') as f:
    f.write(xml_output)

print(f"Deployment Successful: {len(entries)} logs scrubbed and compiled into Captains_Log_Final.xml")
