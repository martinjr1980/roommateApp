import csv
import requests
import json
import re
from bs4 import BeautifulSoup

MONEY = re.compile('\$(\d+)')
ID_MATCH = re.compile('(\d+)')
BED = re.compile('([0-9]){1}\s*BR')
BATH = re.compile('([0-9]){1}\s*Ba')
SQFT = re.compile('(\d+)\s*ft2')

def make_urls(csvfile):
    """Return list of urls"""
    result = []
    with open(csvfile, 'rU') as infile: 
        reader = csv.reader(infile, dialect=csv.excel_tab)
        for row in reader:
            idnum = ID_MATCH.search(row[0]).group()
            result.append((row, idnum))
    return result


def scrape_apartment(url_tuple):
    """Get Data for 1 apartment"""
    req = requests.get(url_tuple[0])
    soup = BeautifulSoup(req.text)
    title = soup.find_all(class_='postingtitle')[0]
    price = MONEY.search(title.text).group(1)
    attrs = soup.find_all(class_='attrgroup')[0]
    try:
        bed = BED.search(attrs.text).group(1)
    except AttributeError:
        return None
    try:
        bath = BATH.search(attrs.text).group(1)
    except AttributeError:
        return None
    try:
        sqft = SQFT.search(attrs.text).group(1)
    except AttributeError:
        return None
    try:
        image = soup.find_all(class_='slide first visible')[0].findChild('img')
        img_url = image.get('src')
    except (AttributeError, IndexError):
        return None
    result = {}
    result['price'] = price
    result['bed'] = bed
    result['bath'] = bath
    result['sqft'] = sqft
    result['img_url'] = img_url
    return result


def write_to_json(inputs):
    """Make output file"""
    with open('rentals.json', 'wB') as outfile:
        json.dump(inputs, outfile)


if __name__ == '__main__':
    urls = make_urls('urls.csv')
    jdict = {}
    for url in urls:
        dic = scrape_apartment(url[0])
        if dic != None:
            jdict[url[1]] = dic
    write_to_json(jdict)
