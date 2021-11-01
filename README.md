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
