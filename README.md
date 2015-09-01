# marmelada [![Build Status](https://travis-ci.org/rafaelrinaldi/marmelada.svg?branch=master)](https://travis-ci.org/rafaelrinaldi/marmelada)

> Randomly select people for [FEMUG-SP](http://sp.femug.com) meetings.

![screenshot](./screenshot.gif)

## Install

```sh
npm install -g marmelada
```

## Usage

```
$ marmelada --help

Usage: marmelada [URL] [OPTIONS]

  Randomly select people for FEMUG-SP's meetings.

Example:
  marmelada http://sp.femug.com/t/femug-42-nasa --total 10

Options:
  -v --version              Display current software version.
  -h --help                 Display help and usage details.
  -f --format               Output format.
  -t --total                Total spots available for the meeting (defaults to list size).
  -i --ignore               Ignore list (comma separated and case sensitive).
```

### Examples

```sh
# List all participants
$ marmelada http://sp.femug.com/t/thread-name/thread-id

# Randomly select 10 users
$ marmelada http://sp.femug.com/t/thread-name/thread-id -t 10

# You can also ignore a list of users (case sensitive)
$ marmelada http://sp.femug.com/t/thread-name/thread-id -i jarvis,BatMan,YOLO

# Prefixing a list of users with "@"
$ marmelada http://sp.femug.com/t/thread-name/thread-id -t 3 -f '@%s'

@igorapa
@marcelgsantos
@keitoliveira
```

### Options

#### `-t`, `--total`

Total spots available for the meeting. Without this argument `marmelada` will simply retrieve a list of all participants.

#### `-i`, `--ignore`

Comma-separated list of user names to keep out of the results.

> By default moderators and admins participating on the thread will be ignored.

#### `-f`, `--format`

Format the entries list output. `%s` will be replaced by the user name.

## How it works

There are a few simple steps in order to select users for [FEMUG-SP](http://sp.femug.com) meetings:

1. An admin creates a new forum thread with the details for the next meeting (company hosting, address, maximum capacity, etc);
2. Everyone interested on participating must reply the thread showing their interest;
3. If the number of people interested is less than the maximum capacity, a random list of people will be selected.

## License

MIT © [Rafael Rinaldi](http://rinaldi.io)
