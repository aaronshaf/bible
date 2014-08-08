[![Build Status](https://travis-ci.org/aaronshaf/bible.svg?branch=master)](https://travis-ci.org/aaronshaf/bible) 


A tool for reading the Bible and studying its languages.

## Heartfelt Thanks

This project depends on [aaronshaf/bible-data](https://github.com/aaronshaf/bible-data), which is based on:

* [morphgnt/sblgnt](https://github.com/morphgnt/sblgnt)
* [aaronshaf/sblgnt](https://github.com/aaronshaf/sblgnt)
* [lexham-english-bible](https://github.com/aaronshaf/lexham-english-bible)
* [billmounce/dictionary](https://github.com/billmounce/dictionary)
* [billmounce/concordance](https://github.com/billmounce/concordance)

A heart-felt thanks to James Tauber, Bill Mounce, Logos Bible Software, and the Society of Biblical Literature for laying a textual and data foundation for this project.

## Installation Instructions

```
npm install
bower install
grunt
```

```
s3cmd sync . --acl-public --guess-mime-type --delete-removed --add-header "Cache-Control: max-age=21600, public" --encoding UTF-8 --recursive s3://bible.yourdomain.com/
```
