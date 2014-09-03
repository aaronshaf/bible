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
      "english": "Matthew",
      "greek": "ΚΑΤΑ ΜΑΘΘΑΙΟΝ"
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
      "english": "Mark",
      "greek": "ΚΑΤΑ ΜΑΡΚΟΝ"
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
      "english": "Luke",
      "greek": "ΚΑΤΑ ΛΟΥΚΑΝ"
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
      "english": "John",
      "greek": "ΚΑΤΑ ΙΩΑΝΝΗΝ"
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
      "english": "Acts",
      "greek": "ΠΡΑΞΕΙΣ ΤΩΝ ΑΠΟΣΤΟΛΩΝ"
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
      "english": "Romans",
      "greek": "ΠΡΟΣ ΡΩΜΑΙΟΥΣ"
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
      "english": "1 Corinthians",
      "greek": "ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Α΄"
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
      "english": "2 Corinthians",
      "greek": "ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Β΄"
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
      "english": "Galatians",
      "greek": "ΠΡΟΣ ΓΑΛΑΤΑΣ"
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
      "english": "Ephesians",
      "greek": "ΠΡΟΣ ΕΦΕΣΙΟΥΣ"
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
      "english": "Philippians",
      "greek": "ΠΡΟΣ ΦΙΛΙΠΠΗΣΙΟΥΣ"
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
      "english": "Colossians",
      "greek": "ΠΡΟΣ ΚΟΛΟΣΣΑΕΙΣ"
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
      "english": "1 Thessalonians",
      "greek": "ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Α΄"
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
      "english": "2 Thessalonians",
      "greek": "ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Β΄"
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
      "english": "1 Timothy",
      "greek": "ΠΡΟΣ ΤΙΜΟΘΕΟΝ Α΄"
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
    "path": "2timothy",
    "osisID": "2Tim",
    "totalChapters": 4,
    "abbreviations": [
      "2Ti"
    ]
  },
  {
    "names": {
      "english": "Titus",
      "greek": "ΠΡΟΣ ΤΙΤΟΝ"
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
      "english": "Philemon",
      "greek": "ΠΡΟΣ ΦΙΛΗΜΟΝΑ"
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
      "english": "Hebrews",
      "greek": "ΠΡΟΣ ΕΒΡΑΙΟΥΣ"
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
      "english": "James",
      "greek": "ΙΑΚΩΒΟΥ"
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
      "english": "1 Peter",
      "greek": "ΠΕΤΡΟΥ Α΄"
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
      "english": "2 Peter",
      "greek": "ΠΕΤΡΟΥ Β΄"
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
      "english": "1 John",
      "greek": "ΙΩΑΝΝΟΥ Α΄"
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
      "english": "2 John",
      "greek": "ΙΩΑΝΝΟΥ Β΄"
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
      "english": "3 John",
      "greek": "ΙΩΑΝΝΟΥ Γ΄"
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
      "english": "Jude",
      "greek": "ΙΟΥΔΑ"
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
      "english": "Revelation",
      "greek": "ΑΠΟΚΑΛΥΨΙΣ ΙΩΑΝΝΟΥ"
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
