App.ApplicationRoute = Ember.Route.extend({
  model: function(params) {
    var books = [
      {
        "names": {
          "english": "Genesis"
        },
        "osisID": "Gen",
        "totalChapters": 50
      },
      {
        "names": {
          "english": "Exodus"
        },
        "osisID": "Exod",
        "totalChapters": 40
      },
      {
        "names": {
          "english": "Leviticus"
        },
        "osisID": "Lev",
        "totalChapters": 27
      },
      {
        "names": {
          "english": "Numbers"
        },
        "osisID": "Num",
        "totalChapters": 36
      },
      {
        "names": {
          "english": "Deuteronomy"
        },
        "osisID": "Deut",
        "totalChapters": 34
      },
      {
        "names": {
          "english": "Joshua"
        },
        "osisID": "Josh",
        "totalChapters": 24
      },
      {
        "names": {
          "english": "Judges"
        },
        "osisID": "Judg",
        "totalChapters": 21
      },
      {
        "names": {
          "english": "Ruth"
        },
        "osisID": "Ruth",
        "totalChapters": 4
      },
      {
        "names": {
          "english": "1 Samuel"
        },
        "osisID": "1Sam",
        "totalChapters": 31
      },
      {
        "names": {
          "english": "2 Samuel"
        },
        "osisID": "2Sam",
        "totalChapters": 24
      },
      {
        "names": {
          "english": "1 Kings"
        },
        "osisID": "1Kgs",
        "totalChapters": 22
      },
      {
        "names": {
          "english": "2 Kings"
        },
        "osisID": "2Kgs",
        "totalChapters": 25
      },
      {
        "names": {
          "english": "1 Chronicles"
        },
        "osisID": "1Chr",
        "totalChapters": 29
      },
      {
        "names": {
          "english": "2 Chronicles"
        },
        "osisID": "2Chr",
        "totalChapters": 36
      },
      {
        "names": {
          "english": "Ezra"
        },
        "osisID": "Ezra",
        "totalChapters": 10
      },
      {
        "names": {
          "english": "Nehemiah"
        },
        "osisID": "Neh",
        "totalChapters": 13
      },
      {
        "names": {
          "english": "Esther"
        },
        "osisID": "Esth",
        "totalChapters": 10
      },
      {
        "names": {
          "english": "Job"
        },
        "osisID": "Job",
        "totalChapters": 42
      },
      {
        "names": {
          "english": "Psalms"
        },
        "osisID": "Ps",
        "totalChapters": 150
      },
      {
        "names": {
          "english": "Proverbs"
        },
        "osisID": "Prov",
        "totalChapters": 31
      },
      {
        "names": {
          "english": "Ecclesiastes"
        },
        "osisID": "Eccl",
        "totalChapters": 12
      },
      {
        "names": {
          "english": "Song of Solomon"
        },
        "osisID": "Song",
        "totalChapters": 8
      },
      {
        "names": {
          "english": "Isaiah"
        },
        "osisID": "Isa",
        "totalChapters": 66
      },
      {
        "names": {
          "english": "Jeremiah"
        },
        "osisID": "Jer",
        "totalChapters": 52
      },
      {
        "names": {
          "english": "Lamentations"
        },
        "osisID": "Lam",
        "totalChapters": 5
      },
      {
        "names": {
          "english": "Ezekiel"
        },
        "osisID": "Ezek",
        "totalChapters": 48
      },
      {
        "names": {
          "english": "Daniel"
        },
        "osisID": "Dan",
        "totalChapters": 12
      },
      {
        "names": {
          "english": "Hosea"
        },
        "osisID": "Hos",
        "totalChapters": 14
      },
      {
        "names": {
          "english": "Joel"
        },
        "osisID": "Joel",
        "totalChapters": 3
      },
      {
        "names": {
          "english": "Amos"
        },
        "osisID": "Amos",
        "totalChapters": 9
      },
      {
        "names": {
          "english": "Obadiah"
        },
        "osisID": "Obad",
        "totalChapters": 1
      },
      {
        "names": {
          "english": "Jonah"
        },
        "osisID": "Jonah",
        "totalChapters": 4
      },
      {
        "names": {
          "english": "Micah"
        },
        "osisID": "Mic",
        "totalChapters": 7
      },
      {
        "names": {
          "english": "Nahum"
        },
        "osisID": "Nah",
        "totalChapters": 3
      },
      {
        "names": {
          "english": "Habakkuk"
        },
        "osisID": "Hab",
        "totalChapters": 3
      },
      {
        "names": {
          "english": "Zephaniah"
        },
        "osisID": "Zeph",
        "totalChapters": 3
      },
      {
        "names": {
          "english": "Haggai"
        },
        "osisID": "Hag",
        "totalChapters": 2
      },
      {
        "names": {
          "english": "Zechariah"
        },
        "osisID": "Zech",
        "totalChapters": 14
      },
      {
        "names": {
          "english": "Malachi"
        },
        "osisID": "Mal",
        "totalChapters": 4
      },
      {
        "names": {
          "english": "Matthew",
          "greek": "ΚΑΤΑ ΜΑΘΘΑΙΟΝ"
        },
        "osisID": "Matt",
        "totalChapters": 28,
        "abbreviations": [
          "Mt"
        ]
      },
      {
        "names": {
          "english": "Mark"
        },
        "osisID": "Mark",
        "totalChapters": 16,
        "abbreviations": [
          "Mk"
        ]
      },
      {
        "names": {
          "english": "Luke"
        },
        "osisID": "Luke",
        "totalChapters": 24,
        "abbreviations": [
          "Lk"
        ]
      },
      {
        "names": {
          "english": "John"
        },
        "osisID": "John",
        "totalChapters": 21,
        "abbreviations": [
          "Jn"
        ]
      },
      {
        "names": {
          "english": "Acts"
        },
        "osisID": "Acts",
        "totalChapters": 28,
        "abbreviations": [
          "Ac"
        ]
      },
      {
        "names": {
          "english": "Romans"
        },
        "osisID": "Rom",
        "totalChapters": 16,
        "abbreviations": [
          "Ro"
        ]
      },
      {
        "names": {
          "english": "1 Corinthians"
        },
        "osisID": "1Cor",
        "totalPassages": 437,
        "totalChapters": 16,
        "abbreviations": [
          "1Co"
        ]
      },
      {
        "names": {
          "english": "2 Corinthians"
        },
        "osisID": "2Cor",
        "totalChapters": 13,
        "abbreviations": [
          "2Co"
        ]
      },
      {
        "names": {
          "english": "Galatians"
        },
        "osisID": "Gal",
        "totalChapters": 6,
        "abbreviations": [
          "Ga"
        ]
      },
      {
        "names": {
          "english": "Ephesians"
        },
        "osisID": "Eph",
        "totalChapters": 6,
        "abbreviations": [
          "Eph"
        ]
      },
      {
        "names": {
          "english": "Philippians"
        },
        "osisID": "Phil",
        "totalChapters": 4,
        "abbreviations": [
          "Php"
        ]
      },
      {
        "names": {
          "english": "Colossians"
        },
        "osisID": "Col",
        "totalChapters": 4,
        "abbreviations": [
          "Col"
        ]
      },
      {
        "names": {
          "english": "1 Thessalonians"
        },
        "osisID": "1Thess",
        "totalChapters": 5,
        "abbreviations": [
          "1Th"
        ]
      },
      {
        "names": {
          "english": "2 Thessalonians"
        },
        "osisID": "2Thess",
        "totalChapters": 3,
        "abbreviations": [
          "2Th"
        ]
      },
      {
        "names": {
          "english": "1 Timothy"
        },
        "osisID": "1Tim",
        "totalChapters": 6,
        "abbreviations": [
          "1Ti"
        ]
      },
      {
        "names": {
          "english": "2 Timothy"
        },
        "osisID": "2Tim",
        "totalChapters": 4,
        "abbreviations": [
          "2Ti"
        ]
      },
      {
        "names": {
          "english": "Titus"
        },
        "osisID": "Titus",
        "totalChapters": 3,
        "abbreviations": [
          "Tit"
        ]
      },
      {
        "names": {
          "english": "Philemon"
        },
        "osisID": "Phlm",
        "totalChapters": 1,
        "abbreviations": [
          "Phm"
        ]
      },
      {
        "names": {
          "english": "Hebrews"
        },
        "osisID": "Heb",
        "totalChapters": 13,
        "abbreviations": [
          "Heb"
        ]
      },
      {
        "names": {
          "english": "James"
        },
        "osisID": "Jas",
        "totalChapters": 5,
        "abbreviations": [
          "Jas"
        ]
      },
      {
        "names": {
          "english": "1 Peter"
        },
        "osisID": "1Pet",
        "totalChapters": 5,
        "abbreviations": [
          "1Pe"
        ]
      },
      {
        "names": {
          "english": "2 Peter"
        },
        "osisID": "2Pet",
        "totalChapters": 3,
        "abbreviations": [
          "2Pe"
        ]
      },
      {
        "names": {
          "english": "1 John"
        },
        "osisID": "1John",
        "totalChapters": 5,
        "abbreviations": [
          "1Jn"
        ]
      },
      {
        "names": {
          "english": "2 John"
        },
        "osisID": "2John",
        "totalChapters": 1,
        "abbreviations": [
          "2Jn"
        ]
      },
      {
        "names": {
          "english": "3 John"
        },
        "osisID": "3John",
        "totalChapters": 1,
        "abbreviations": [
          "3Jn"
        ]
      },
      {
        "names": {
          "english": "Jude"
        },
        "osisID": "Jude",
        "totalChapters": 1,
        "abbreviations": [
          "Jud"
        ]
      },
      {
        "names": {
          "english": "Revelation"
        },
        "osisID": "Rev",
        "totalChapters": 22,
        "abbreviations": [
          "Re"
        ]
      }
    ];

    return books.slice(39).map(function(book) {
      return Ember.Object.create(book);
    });
  }
});
