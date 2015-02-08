import csv
import requests
import json
import re
from bs4 import BeautifulSoup
import pdb

MONEY = re.compile('\$(\d+)')
ID_MATCH = re.compile('(\d+)')
BED = re.compile('([0-9]){1}\s*BR')
BATH = re.compile('([0-9]){1}\s*Ba')
SQFT = re.compile('(\d+)\s*ft2')

def make_urls(csvfile):
    """Return list of urls"""
    result = []
    with open(csvfile, 'rU') as infile: 
        reader = csv.DictReader(infile, dialect=csv.excel,
                                fieldnames=['ID','URL','Latitude','Longitude'])
        for row in reader:
            idnum = row['ID']
            url = row['URL']
            lat = row['Latitude']
            lon = row['Longitude']
            result.append((url, idnum, lat, lon))
    return result


def scrape_apartment(url_tuple):
    """Get Data for 1 apartment"""
    req = requests.get(url_tuple[0])
    soup = BeautifulSoup(req.text)
    try:
        title = soup.find_all(class_='postingtitle')[0]
    except:
        pdb.set_trace()
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
    result['url'] = url_tuple[0]
    result['idnum'] = url_tuple[1]
    result['lat'] = url_tuple[2]
    result['lon'] = url_tuple[3]
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
    urls = make_urls('apts.csv')
    jlist = []
    for url in urls:
        dic = scrape_apartment(url)
        if dic != None:
            jlist.append(dic)
    write_to_json(jlist)
