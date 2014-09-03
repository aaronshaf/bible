var Immutable = require('immutable')

var books = Immutable.fromJS([
  {
    "names": {
      "english": "Genesis"
    },
    "path": "genesis",
    "osisID": "Gen",
    "totalChapters": 50
  },
  {
    "names": {
      "english": "Exodus"
    },
    "path": "exodus",
    "osisID": "Exod",
    "totalChapters": 40
  },
  {
    "names": {
      "english": "Leviticus"
    },
    "path": "leviticus",
    "osisID": "Lev",
    "totalChapters": 27
  },
  {
    "names": {
      "english": "Numbers"
    },
    "path": "numbers",
    "osisID": "Num",
    "totalChapters": 36
  },
  {
    "names": {
      "english": "Deuteronomy"
    },
    "path": "deuteronomy",
    "osisID": "Deut",
    "totalChapters": 34
  },
  {
    "names": {
      "english": "Joshua"
    },
    "path": "joshua",
    "osisID": "Josh",
    "totalChapters": 24
  },
  {
    "names": {
      "english": "Judges"
    },
    "path": "judges",
    "osisID": "Judg",
    "totalChapters": 21
  },
  {
    "names": {
      "english": "Ruth"
    },
    "path": "ruth",
    "osisID": "Ruth",
    "totalChapters": 4
  },
  {
    "names": {
      "english": "1 Samuel"
    },
    "path": "1samuel",
    "osisID": "1Sam",
    "totalChapters": 31
  },
  {
    "names": {
      "english": "2 Samuel"
    },
    "path": "2samuel",
    "osisID": "2Sam",
    "totalChapters": 24
  },
  {
    "names": {
      "english": "1 Kings"
    },
    "path": "1kings",
    "osisID": "1Kgs",
    "totalChapters": 22
  },
  {
    "names": {
      "english": "2 Kings"
    },
    "path": "2kings",
    "osisID": "2Kgs",
    "totalChapters": 25
  },
  {
    "names": {
      "english": "1 Chronicles"
    },
    "path": "1chronicles",
    "osisID": "1Chr",
    "totalChapters": 29
  },
  {
    "names": {
      "english": "2 Chronicles"
    },
    "path": "2chronicles",
    "osisID": "2Chr",
    "totalChapters": 36
  },
  {
    "names": {
      "english": "Ezra"
    },
    "path": "ezra",
    "osisID": "Ezra",
    "totalChapters": 10
  },
  {
    "names": {
      "english": "Nehemiah"
    },
    "path": "nehemiah",
    "osisID": "Neh",
    "totalChapters": 13
  },
  {
    "names": {
      "english": "Esther"
    },
    "path": "esther",
    "osisID": "Esth",
    "totalChapters": 10
  },
  {
    "names": {
      "english": "Job"
    },
    "path": "job",
    "osisID": "Job",
    "totalChapters": 42
  },
  {
    "names": {
      "english": "Psalms"
    },
    "path": "psalm",
    "osisID": "Ps",
    "totalChapters": 150
  },
  {
    "names": {
      "english": "Proverbs"
    },
    "path": "proverbs",
    "osisID": "Prov",
    "totalChapters": 31
  },
  {
    "names": {
      "english": "Ecclesiastes"
    },
    "path": "ecclesiastes",
    "osisID": "Eccl",
    "totalChapters": 12
  },
  {
    "names": {
      "english": "Song of Solomon"
    },
    "path": "songofsolomon",
    "osisID": "Song",
    "totalChapters": 8
  },
  {
    "names": {
      "english": "Isaiah"
    },
    "path": "isaiah",
    "osisID": "Isa",
    "totalChapters": 66
  },
  {
    "names": {
      "english": "Jeremiah"
    },
    "path": "jeremiah",
    "osisID": "Jer",
    "totalChapters": 52
  },
  {
    "names": {
      "english": "Lamentations"
    },
    "path": "lamentations",
    "osisID": "Lam",
    "totalChapters": 5
  },
  {
    "names": {
      "english": "Ezekiel"
    },
    "path": "ezekiel",
    "osisID": "Ezek",
    "totalChapters": 48
  },
  {
    "names": {
      "english": "Daniel"
    },
    "path": "daniel",
    "osisID": "Dan",
    "totalChapters": 12
  },
  {
    "names": {
      "english": "Hosea"
    },
    "path": "hosea",
    "osisID": "Hos",
    "totalChapters": 14
  },
  {
    "names": {
      "english": "Joel"
    },
    "path": "joel",
    "osisID": "Joel",
    "totalChapters": 3
  },
  {
    "names": {
      "english": "Amos"
    },
    "path": "amos",
    "osisID": "Amos",
    "totalChapters": 9
  },
  {
    "names": {
      "english": "Obadiah"
    },
    "path": "obadiah",
    "osisID": "Obad",
    "totalChapters": 1
  },
  {
    "names": {
      "english": "Jonah"
    },
    "path": "jonah",
    "osisID": "Jonah",
    "totalChapters": 4
  },
  {
    "names": {
      "english": "Micah"
    },
    "path": "micah",
    "osisID": "Mic",
    "totalChapters": 7
  },
  {
    "names": {
      "english": "Nahum"
    },
    "path": "nahum",
    "osisID": "Nah",
    "totalChapters": 3
  },
  {
    "names": {
      "english": "Habakkuk"
    },
    "path": "habakkuk",
    "osisID": "Hab",
    "totalChapters": 3
  },
  {
    "names": {
      "english": "Zephaniah"
    },
    "path": "zephaniah",
    "osisID": "Zeph",
    "totalChapters": 3
  },
  {
    "names": {
      "english": "Haggai"
    },
    "path": "haggai",
    "osisID": "Hag",
    "totalChapters": 2
  },
  {
    "names": {
      "english": "Zechariah"
    },
    "path": "zechariah",
    "osisID": "Zech",
    "totalChapters": 14
  },
  {
    "names": {
      "english": "Malachi"
    },
    "path": "malachi",
    "osisID": "Mal",
    "totalChapters": 4
  },
  {
    "names": {
      "english": "The Gospel of Matthew",
      "greek": "ΚΑΤΑ ΜΑΘΘΑΙΟΝ"
    },
    "shortNames": {
      "english": "Matthew",
      "greek": "μαθθαιος"
    },
    "path": "matthew",
    "osisID": "Matt",
    "totalChapters": 28,
    "abbreviations": [
      "Mt"
    ]
  },
  {
    "names": {
      "english": "The Gospel of Mark",
      "greek": "ΚΑΤΑ ΜΑΡΚΟΝ"
    },
    "shortNames": {
      "english": "Mark",
      "greek": "μαρκος"
    },
    "path": "mark",
    "osisID": "Mark",
    "totalChapters": 16,
    "abbreviations": [
      "Mk"
    ]
  },
  {
    "names": {
      "english": "The Gospel of Luke",
      "greek": "ΚΑΤΑ ΛΟΥΚΑΝ"
    },
    "shortNames": {
      "english": "Luke",
      "greek": "λουκας"
    },
    "path": "luke",
    "osisID": "Luke",
    "totalChapters": 24,
    "abbreviations": [
      "Lk"
    ]
  },
  {
    "names": {
      "english": "The Gospel of John",
      "greek": "ΚΑΤΑ ΙΩΑΝΝΗΝ"
    },
    "shortNames": {
      "english": "John",
      "greek": "ιωαννης"
    },
    "path": "john",
    "osisID": "John",
    "totalChapters": 21,
    "abbreviations": [
      "Jn"
    ]
  },
  {
    "names": {
      "english": "The Acts of the Apostles",
      "greek": "ΠΡΑΞΕΙΣ ΤΩΝ ΑΠΟΣΤΟΛΩΝ"
    },
    "shortNames": {
      "english": "Acts",
      "greek": "πραξεις"
    },
    "path": "acts",
    "osisID": "Acts",
    "totalChapters": 28,
    "abbreviations": [
      "Ac"
    ]
  },
  {
    "names": {
      "english": "Epistle to the Romans",
      "greek": "ΠΡΟΣ ΡΩΜΑΙΟΥΣ"
    },
    "shortNames": { 
      "english": "Romans",
      "greek": "ρωμαιους"
    },
    "path": "romans",
    "osisID": "Rom",
    "totalChapters": 16,
    "abbreviations": [
      "Ro"
    ]
  },
  {
    "names": {
      "english": "The First Epistle to the Corinthians",
      "greek": "ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Α΄"
    },
    "shortNames": {
      "english": "1 Corinthians",
      "greek": "κορινθιους α"
    },
    "path": "1corinthians",
    "osisID": "1Cor",
    "totalPassages": 437,
    "totalChapters": 16,
    "abbreviations": [
      "1Co"
    ]
  },
  {
    "names": {
      "english": "The Second Epistle to the Corinthians",
      "greek": "ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Β΄"
    },
    "shortNames": {
      "english": "2 Corinthians",
      "greek": "κορινθιους β"
    },
    "path": "2corinthians",
    "osisID": "2Cor",
    "totalChapters": 13,
    "abbreviations": [
      "2Co"
    ]
  },
  {
    "names": {
      "english": "The Epistle to the Galatians",
      "greek": "ΠΡΟΣ ΓΑΛΑΤΑΣ"
    },
    "shortNames": {
      "english": "Galatians",
      "greek": "γαλατας"
    },
    "path": "galatians",
    "osisID": "Gal",
    "totalChapters": 6,
    "abbreviations": [
      "Ga"
    ]
  },
  {
    "names": {
      "english": "The Epistle to the Ephesians",
      "greek": "ΠΡΟΣ ΕΦΕΣΙΟΥΣ"
    },
    "shortNames": {
      "english": "Ephesians",
      "greek": "φιλιππησιους"
    },
    "path": "ephesians",
    "osisID": "Eph",
    "totalChapters": 6,
    "abbreviations": [
      "Eph"
    ]
  },
  {
    "names": {
      "english": "The Epistle to the Philippians",
      "greek": "ΠΡΟΣ ΦΙΛΙΠΠΗΣΙΟΥΣ"
    },
    "shortNames": {
      "english": "Philippians",
      "greek": "φιλιππησιους"
    },
    "path": "philippians",
    "osisID": "Phil",
    "totalChapters": 4,
    "abbreviations": [
      "Php"
    ]
  },
  {
    "names": {
      "english": "The Epistle to the Colossians",
      "greek": "ΠΡΟΣ ΚΟΛΟΣΣΑΕΙΣ"
    },
    "shortNames": {
      "english": "Colossians",
      "greek": "κολοσσαεις"
    },
    "path": "colossians",
    "osisID": "Col",
    "totalChapters": 4,
    "abbreviations": [
      "Col"
    ]
  },
  {
    "names": {
      "english": "The First Epistle to the Thessalonians",
      "greek": "ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Α΄"
    },
    "shortNames": {
      "english": "1 Thessalonians",
      "greek": "θεσσαλονικεις α"
    },
    "path": "1thessalonians",
    "osisID": "1Thess",
    "totalChapters": 5,
    "abbreviations": [
      "1Th"
    ]
  },
  {
    "names": {
      "english": "The Second Epistle to the Thessalonians",
      "greek": "ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Β΄"
    },
    "shortNames": {
      "english": "2 Thessalonians",
      "greek": "θεσσαλονικεις β"
    },
    "path": "2thessalonians",
    "osisID": "2Thess",
    "totalChapters": 3,
    "abbreviations": [
      "2Th"
    ]
  },
  {
    "names": {
      "english": "The First Epistle to Timothy",
      "greek": "ΠΡΟΣ ΤΙΜΟΘΕΟΝ Α΄"
    },
    "shortNames": {
      "english": "1 Timothy",
      "greek": "τιμοθεος α"
    },
    "path": "1timothy",
    "osisID": "1Tim",
    "totalChapters": 6,
    "abbreviations": [
      "1Ti"
    ]
  },
  {
    "names": {
      "english": "2 Timothy",
      "greek": "ΠΡΟΣ ΤΙΜΟΘΕΟΝ Β΄"
    },
    "shortNames": {
      "english": "2 Timothy",
      "greek": "τιμοθεος β"
    },
    "path": "2timothy",
    "osisID": "2Tim",
    "totalChapters": 4,
    "abbreviations": [
      "2Ti"
    ]
  },
  {
    "names": {
      "english": "The Epistle to Titus",
      "greek": "ΠΡΟΣ ΤΙΤΟΝ"
    },
    "shortNames": {
      "english": "Titus",
      "greek": "τιτος"
    },
    "path": "titus",
    "osisID": "Titus",
    "totalChapters": 3,
    "abbreviations": [
      "Tit"
    ]
  },
  {
    "names": {
      "english": "The Epistle to Philemon",
      "greek": "ΠΡΟΣ ΦΙΛΗΜΟΝΑ"
    },
    "shortNames": {
      "english": "Philemon",
      "greek": "φιλημων"
    },
    "path": "philemon",
    "osisID": "Phlm",
    "totalChapters": 1,
    "abbreviations": [
      "Phm"
    ]
  },
  {
    "names": {
      "english": "The Epistle to the Hebrews",
      "greek": "ΠΡΟΣ ΕΒΡΑΙΟΥΣ"
    },
    "shortNames": {
      "english": "Hebrews",
      "greek": "εβραιους"
    },
    "path": "hebrews",
    "osisID": "Heb",
    "totalChapters": 13,
    "abbreviations": [
      "Heb"
    ]
  },
  {
    "names": {
      "english": "The Epistle of James",
      "greek": "ΙΑΚΩΒΟΥ"
    },
    "shortNames": {
      "english": "James",
      "greek": "ιακωβος"
    },
    "path": "james",
    "osisID": "Jas",
    "totalChapters": 5,
    "abbreviations": [
      "Jas"
    ]
  },
  {
    "names": {
      "english": "The First Epistle of Peter",
      "greek": "ΠΕΤΡΟΥ Α΄"
    },
    "shortNames": {
      "english": "1 Peter",
      "greek": "πετρος α"
    },
    "path": "1peter",
    "osisID": "1Pet",
    "totalChapters": 5,
    "abbreviations": [
      "1Pe"
    ]
  },
  {
    "names": {
      "english": "The Second Epistle of Peter",
      "greek": "ΠΕΤΡΟΥ Β΄"
    },
    "shortNames": {
      "english": "2 Peter",
      "greek": "πετρος β"
    },
    "path": "2peter",
    "osisID": "2Pet",
    "totalChapters": 3,
    "abbreviations": [
      "2Pe"
    ]
  },
  {
    "names": {
      "english": "The First Epistle of John",
      "greek": "ΙΩΑΝΝΟΥ Α΄"
    },
    "shortNames": {
      "english": "1 John",
      "greek": "ιωαννου α"
    },
    "path": "1john",
    "osisID": "1John",
    "totalChapters": 5,
    "abbreviations": [
      "1Jn"
    ]
  },
  {
    "names": {
      "english": "The Second Epistle of John",
      "greek": "ΙΩΑΝΝΟΥ Β΄"
    },
    "shortNames": {
      "english": "2 John",
      "greek": "ιωαννου β"
    },
    "path": "2john",
    "osisID": "2John",
    "totalChapters": 1,
    "abbreviations": [
      "2Jn"
    ]
  },
  {
    "names": {
      "english": "The Third Epistle of John",
      "greek": "ΙΩΑΝΝΟΥ Γ΄"
    },
    "shortNames": {
      "english": "3 John",
      "greek": "ιωαννου γ"
    },
    "path": "3john",
    "osisID": "3John",
    "totalChapters": 1,
    "abbreviations": [
      "3Jn"
    ]
  },
  {
    "names": {
      "english": "The Epistle of Jude",
      "greek": "ΙΟΥΔΑ"
    },
    "shortNames": {
      "english": "Jude",
      "greek": "ιουδα"
    },
    "path": "jude",
    "osisID": "Jude",
    "totalChapters": 1,
    "abbreviations": [
      "Jud"
    ]
  },
  {
    "names": {
      "english": "The Book of Revelation",
      "greek": "ΑΠΟΚΑΛΥΨΙΣ ΙΩΑΝΝΟΥ"
    },
    "shortNames": {
      "english": "Revelation",
      "greek": "αποκαλυψις"
    },
    "path": "revelation",
    "osisID": "Rev",
    "totalChapters": 22,
    "abbreviations": [
      "Re"
    ]
  }
])


exports.findAll = function() {
  // We don't support the OT yet
  var newTestament = books.slice(39)
  return newTestament
}

exports.findByPath = function(path) {
  return books.find(function(book) {
    return book.get('path') === path.toLowerCase()
  })
}

exports.findPreviousChapter = function(book,chapter) {
  var chapterNumber = parseInt(chapter,10)
  var newBook = book
  var newChapter = chapterNumber - 1
  var bookIndex = books.indexOf(book)

  if(newChapter < 1) {
    if(bookIndex > 39) {
      newBook = books.get(bookIndex - 1)
      newChapter = newBook.get('totalChapters')
    }
  }

  if(newChapter < 1) {
      newChapter = 1
  }

  return Immutable.Map({
    book: newBook,
    chapter: newChapter
  })
}

exports.findPreviousBook = function(book) {
  var newBook = book
  var newChapter = 1
  var bookIndex = books.indexOf(book)

  if(bookIndex > 39) {
    newBook = books.get(bookIndex - 1)
  }

  return Immutable.Map({
    book: newBook,
    chapter: newChapter
  })
}

exports.findNextChapter = function(book,chapter) {
  var chapterNumber = parseInt(chapter,10)
  var newBook = book
  var newChapter = chapterNumber + 1
  var bookIndex

  if(newChapter > book.get('totalChapters')) {
    newChapter = 1
    bookIndex = books.indexOf(book)
    if(bookIndex + 1 < books.length) {
      newBook = books.get(bookIndex + 1)
    }
  }
  return Immutable.Map({
    book: newBook,
    chapter: newChapter
  })
}

exports.findNextBook = function(book) {
  var newBook = book
  var newChapter = 1
  var bookIndex = books.indexOf(book)

  if(bookIndex < 65) {
    newBook = books.get(bookIndex + 1)
  }

  return Immutable.Map({
    book: newBook,
    chapter: newChapter
  })
}
