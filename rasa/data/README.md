# Data Sources
Data for lookup tables has to be downloaded and prepared from the given sources.

## Prenames lookup
https://www.bfs.admin.ch/bfs/de/home/statistiken/bevoelkerung/geburten-todesfaelle/vornamen-schweiz.assetdetail.5946318.html

### Preparation
Conversion to csv with https://www.zamzar.com/convert/xls-to-csv/ then stored as prenames-switzerland.csv in '''/raw'''. Using script '''ruby prepare-prenames.rb''' to create '''data/lookup/lookup-prenames.csv'''.

## Plates lookup
http://usefulenglish.ru/vocabulary/food-main-list

### Preparation
Preparation was done with geany (https://www.geany.org/) texteditor by removing ", " and replacing them with "\n". And some manual clean up. Stored as '''data/lookup/lookup_plates.txt'''.

## Possible other sources
Nutrition data for switzerland
http://naehrwertdaten.ch/request?xml=MessageData&xml=MetaData&xsl=Download&lan=de&pageKey=Start

Annotated sentences
https://www.kaggle.com/abhinavwalia95/entity-annotated-corpus#ner_dataset.csv
