# APSI bug tracker
TODO: description

## Contribution guide

### Dev tools
Currently used dev tools:

* Commitizen CLI [installed globally](https://github.com/commitizen/cz-cli#installing-the-command-line-tool)

### Commit convention

Please consider these guidelines when filing a pull request:

*  Commits follow the [Angular commit convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
*  Features and bug fixes should be covered by test cases

### Creating releases

The project uses [semantic-release](https://github.com/semantic-release/semantic-release)
to release new versions automatically.

*  Commits of type `fix` will trigger bugfix releases, think `0.0.1`
*  Commits of type `feat` will trigger feature releases, think `0.1.0`
*  Commits with `BREAKING CHANGE` in body or footer will trigger breaking releases, think `1.0.0`

All other commit types will trigger no new release.

## AWS Lambda i AWS Lambda Layer
Kod źródłowy Lambd oraz Layer-ów znajduje się w folderze `lambda`. W ogólność różnica między tymi dwoma bytami polega na obecności plików konfiguracyjnych Python-owej paczki tj. `setup.cfg` (plik konfiguracyjny dla *setuptools*) oraz `pyproject.toml` (plik konfiguracyjny zawierający informacje o sposobie budowania paczki).

W związku z tym, że kod lambda (póki co) jest pisany w Python-ie, zaleca jest aby korzystać z wirtualnych środowisk **venv** oraz zapisywania zależności w plikach **requirements.txt** (standardowe zależności wymagane do działania lambdy) oraz **requirements-dev.txt** (zależności potrzebne tylko w procesie deweloperskim np. biblioteki do testów, lintery itp.).
#### Tworzenie wirtualnego środowiska:
```sh
python3 -m venv venv
```
W ten sposób utworzone zostanie wirtualne środowisko o nazwie *venv* (ostatni argument).

#### Aktywacja środowiska:
```sh
source venv/bin/activate
```
#### Instalacja zależności:
```sh
pip install -r requirements.txt
```

### AWS Lambda Layer
Definiowanie layer-a jest podobne do definiowania zwykłej lambdy. Sam kod layer-a stanowi typową Python-ową bibliotekę/paczkę.

Przykładowy fragment definiowania layer-a w stack-u przedstawia się następująco:
```typescript
    const databaseLayer = new lambda.LayerVersion(this, 'database-layer', {
      code: lambda.Code.fromAsset(
        path.join('lambda', 'database'),
        {
          // Bundle-owanie w obrazie docker-owym
          bundling: {
            image: lambda.Runtime.PYTHON_3_9.bundlingImage,
            command: [
              'bash',
              '-c',
              'pip install . -t /asset-output/python', // Instalacja paczki do folderu /asset-output/python
            ],
          },
        }
      ),
    });
```
Wykorzystujemy bundle-owanie do zbudowania kodu layer-a, ponieważ zależy nam na tym aby jako layer dostać bibliotekę i aby działo się to w miarę automatycznie przy braku potrzeby trzymania zbudowanej paczki na repozytorium. Cel taki osiągamy poprzez  instalację paczki do folderu `/asset-output/python`. Folder `/asset-output` jest miejscem w kontenerze docker-owym, z którego zostanie skopiowana zawartość, następnie zostanie skompresowana (zip) i przesłana do AWS S3 (tam trzymane są kody źródłowe lambd itp.). Folder `python` jest wymagany przez specyfikację layer-a (prawdopodobnie AWS tak określa jakie jest środowisko wykonawcze layer-a, w tym wypadku jest to Python) W taki sposób przy deploy-u aplikacji nasz kod sam zainstaluje paczkę i *wgra* ją layer-a.

Istotne z punktu widzenia łatwości dewelopowania jest jeszcze dodanie/instalacja paczki w *venv-ie* lambdy. Można to zrobić poprzez dodanie do **requirements-dev.txt** linii w postaci podobnej do:
```
file:///home/artur/documents/weiti/apsi/apsi-bug-tracker/lambda/database
```
Jest to wskazanie pip-owi, że ma zainstalować paczkę znajdującą się we wskazanej ścieżce (**TRZEBA ZMIENIĆ ŚCIEŻKĘ NA ŚCIEŻKĘ DO PACZKI Z LOKALNEJ MASZYNY**). Istotne jest jeszcze aby dodać to w zależnościach deweloperskich (z suffix-em *-dev.txt*), ponieważ nie chcemy aby było to instalowane na lambda-ch w taki sposób (w taki sposób by nawet to nie zadziałało, bo nie ma takiej ścieżki w środowisku wykonawczym lambdy) od tego są layer-y.

### Pliki .dockerignore
Pliki te są używane trochę nie w celu z jakim normalnie są używane tj. wyłączania plików z dodawania ich do obrazów docker-owych. W tym przypadku używane są do wyłączania plików z bundle-i lambd. Przykład wykorzystania przedstawiono poniżej:
```typescript
 const createIssuesLambda = new lambda.Function(this, 'CreateIssues', {
      code: lambda.Code.fromAsset(path.join('lambda', 'create_issues'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output &&  rsync -av --progress . /asset-output --exclude-from=.dockerignore',
          ],
        },
      }),
      // ...
    });
```
Korzystamy to z takiej samej techniki jak w przypadku layer-ów, lecz tym razem kopiujemy pliki tylko do folderu `/asset-output`. Na początku kopiowane są zainstalowane zależności do tego folderu, a następnie kopiujemy wszystkie pliki z wyłączeniem tego co jest w *.dockerignore*. Jest to istotne ponieważ przy korzystaniu z *venv-a* chcemy uniknąć kopiowania folderu z wirtualnym środowiskiem (jest za duży) jak i innych nie potrzebnych plików.

### Praca z kodem
Polecam otwierać każdą lambdę w osobnym edytorze i tworzyć nowe *venv-y* dla każdej z lambd. W ten sposób można korzystać z dobrodziejstwa IDE i uzyskać podpowiedzi do kodu itp.