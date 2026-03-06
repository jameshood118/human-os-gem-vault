#!/usr/bin/env python3
import pandas as pd
import re
from html import escape

# 1. Load and filter the raw telemetry
df = pd.read_csv('Shares.csv')
df = df.dropna(subset=['ShareCommentary'])
df = df[df['ShareCommentary'].str.len() > 50].copy()
df = df.sort_values(by='Date', ascending=True)

# 2. Build the XML Header (The WordPress Architecture Substack expects)
xml_output = """<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
    xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
    <title>The Verified Generalist</title>
    <link>https://jameshood118.substack.com</link>
    <description>The Feral Archive</description>
    <wp:wxr_version>1.2</wp:wxr_version>
"""

# 3. Compile the posts into XML Nodes
for index, row in df.iterrows():
    post_date = str(row['Date'])
    title = f"[SYS-AUDIT] Feral Archive Log: {post_date[:10]}"

    # Clean the payload
    body = str(row['ShareCommentary']).replace(']]>', ']]&gt;')

    # Extract tags into proper XML categories
    tags = re.findall(r'#(\w+)', body)
    tag_xml = ""
    for tag in tags:
        tag_xml += f'<category domain="post_tag" nicename="{tag.lower()}"><![CDATA[{tag}]]></category>\n'

    # Build the item
    xml_output += f"""
    <item>
        <title>{escape(title)}</title>
        <pubDate>{post_date}</pubDate>
        <dc:creator><![CDATA[James Hood]]></dc:creator>
        <content:encoded><![CDATA[{body}]]></content:encoded>
        <wp:post_date><![CDATA[{post_date}]]></wp:post_date>
        <wp:status><![CDATA[publish]]></wp:status>
        <wp:post_type><![CDATA[post]]></wp:post_type>
        {tag_xml}
    </item>
    """

# 4. Close the XML structure
xml_output += """
</channel>
</rss>
"""

# 5. Export to the file system
with open('Node118_Archive.xml', 'w', encoding='utf-8') as f:
    f.write(xml_output)

print(f"XML Compilation complete. {len(df)} records mapped into WordPress schema.")
print("File saved as: Node118_Archive.xml")
