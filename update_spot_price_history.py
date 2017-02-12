import re
import json
import requests

r = requests.get('http://onlygold.com/Info/Search-Gold-Prices.asp')

SEED = [
    ("2016-08-10", "1347.70"),
    ("2016-08-09", "1341.00"),
    ("2016-08-08", "1336.80"),
    ("2016-08-05", "1340.40"),
    ("2016-08-04", "1362.75"),
    ("2016-08-03", "1358.90"),
    ("2016-08-02", "1363.75"),
    ("2016-08-01", "1349.65"),
    ("2016-07-29", "1342.00"),
    ("2016-07-28", "1341.75"),
    ("2016-07-27", "1329.00"),
    ("2016-07-26", "1323.00"),
    ("2016-07-25", "1313.15"),
    ("2016-07-22", "1320.75"),
    ("2016-07-21", "1321.15"),
]
SEED.sort(reverse=True)
#print json.dumps(SEED)

MONTHS = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12',
}

prices = dict(json.load(open('gold.json')))
date = None
price = None
for s in r.text.split('\n'):
    if 'priceGriddata' in s:
        m = re.search(r'\s+([A-Z][a-z][a-z]) (\d\d), (\d\d\d\d)', s)
        if m:
            date = '-'.join((m.group(3), MONTHS[m.group(1)], m.group(2)))
        else:
            m = re.search(r'\$(\d?,?\d\d\d\.\d\d)', s)
            if m:
                price = m.group(1).replace(',', '')
        if date and price:
            prices[date] = price
            date = None
            price = None

out = sorted(prices.items(), reverse=True)
json.dump(out, open('gold.json', 'w'), indent=2)
open('gold.csv', 'w').write('\n'.join((','.join(line) for line in out)))
