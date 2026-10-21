import urllib.request
import re

req = urllib.request.Request(
    "https://flow.google.com/shared/video/65755794-adcf-4194-9144-6e7ca094ba5d",
    headers={"User-Agent": "Mozilla/5.0"}
)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8", errors="ignore")

scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', html)
for s in scripts:
    print(s)
