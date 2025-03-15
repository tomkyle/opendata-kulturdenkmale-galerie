# opendata-kulturdenkmale-galerie
**Demo-Anwendung: Kulturdenkmale in Schleswig-Holstein, basierend auf dem Open-Data-Angebot des Landes Schleswig-Holstein.** 

Demo application: Cultural monuments gallery, based on Open Data published by German federal state Schleswig-Holstein.

## Data sources

The monument lists (German: „Denkmallisten“) by the *Landesamt für Denkmalpflege Schleswig-Holstein* can be accessed at the [Open Data Portal](https://opendata.schleswig-holstein.de/organization/landesamt-fur-denkmalpflege) Schleswig-Holstein. The webservice URLs used in this application point to their respective latest version:

- [Kreis Dithmarschen](https://opendata.schleswig-holstein.de/collection/denkmalliste-dithmarschen/aktuell.json)
- [Stadt Flensburg](https://opendata.schleswig-holstein.de/collection/denkmalliste-flensburg/aktuell.json)
- [Kreis Herzogtum Lauenburg](https://opendata.schleswig-holstein.de/collection/denkmalliste-herzogtum-lauenburg/aktuell.json)
- [Stadt Kiel](https://opendata.schleswig-holstein.de/collection/denkmalliste-kiel/aktuell.json)
- [Stadt Neumünster](https://opendata.schleswig-holstein.de/collection/denkmalliste-neumuenster/aktuell.json)
- [Kreis Nordfriesland](https://opendata.schleswig-holstein.de/collection/denkmalliste-nordfriesland/aktuell.json)
- [Kreis Ostholstein](https://opendata.schleswig-holstein.de/collection/denkmalliste-ostholstein/aktuell.json)
- [Kreis Pinneberg](https://opendata.schleswig-holstein.de/collection/denkmalliste-pinneberg/aktuell.json)
- [Kreis Plön](https://opendata.schleswig-holstein.de/collection/denkmalliste-ploen/aktuell.json)
- [Kreis Rendsburg-Eckernförde](https://opendata.schleswig-holstein.de/collection/denkmalliste-rendsburg-eckernfoerde/aktuell.json)
- [Kreis Schleswig-Flensburg](https://opendata.schleswig-holstein.de/collection/denkmalliste-schleswig-flensburg/aktuell.json)
- [Kreis Segeberg](https://opendata.schleswig-holstein.de/collection/denkmalliste-segeberg/aktuell.json)
- [Kreis Steinburg](https://opendata.schleswig-holstein.de/collection/denkmalliste-steinburg/aktuell.json)
- [Kreis Stormarn](https://opendata.schleswig-holstein.de/collection/denkmalliste-stormarn/aktuell.json)

## Data structure

The JSON files contains a single array of objects with properties as shown in the following table. 

> **Some of these fields are not mandatory.** This means: If the absence of a value is to be displayed, the field is not marked with a `null` value, but is missing in the object.

| Property         | Type       | Example                                                    | Required |
| ---------------- | ---------- | ---------------------------------------------------------- | -------- |
| Adresse-Lage     | `string`   | `Am Bondenholz 26, 26-30, 30`                              | no       |
| Beschreibung     | `string`   | `Fertig-Holzhaus auf gemauertem Sockel ...`                |          |
| Bezeichnung      | `string`   | `Obsthof Mehrens`                                          |          |
| Kulturdenkmaltyp | `string`   | `Sachgesamtheit`                                           |          |
| Schutzumfang     | `string[]` | `["Obsthof", "Gärtnerhaus", "Apfelwiese"]`                 | no       |
| Gemeinde         | `string`   | `Neumünster, Stadt`                                        |          |
| Begründung       | `string[]` | `["Geschichtlich", "Künsterlich", "Kulturlandschaftlich"]` | no       |
| Objektnummer     | `int`      | `42758`                                                    |          |
| Kreis            | `string`   | `Stadt Neumünster`                                         |          |
| FotoURL          | `string`   | `https://example.org/photo.jpg`                            | no       |

## Development

1. Clone repo. 
2. Start a small web server: [http://localhost:8020/](http://localhost:8020/)

```bash
$ php -S localhost:8020
```

## Acknowledgements

- Landesamt für Denkmalpflege Schleswig-Holstein for [the data](https://opendata.schleswig-holstein.de/organization/landesamt-fur-denkmalpflege)
- [Steph Ango](https://stephango.com/) for his fabulous [Flexoki](https://stephango.com/flexoki) color scheme

## Authors

Carsten Witt · [tomkyle.net](https://tomkyle.net)

## Licenses

<ul>
  <li xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">The JSON data used in this application is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> „Landesamt für Denkmalpflege Schleswig-Holstein.“</li>
  <li>The <a property="dct:title" rel="cc:attributionURL" href="https://tomkyle.github.io/opendata-kulturdenkmale-galerie/">gallery app</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://tomkyle.net">Carsten Witt</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""></a></li></ul> 
