jest.dontMock('../../../app/models/book')
jest.dontMock('immutable')

describe('models/book', function() {
  it('#findAll', function() {
    var BookModel = require('../../../app/models/book')
    expect(BookModel.findAll().length).toBe(27)
  })

  it('#findByPath', function() {
    var BookModel = require('../../../app/models/book')
    expect(BookModel.findByPath('revelation').get('osisID')).toBe('Rev')
  })

  it('#findNextChapter', function() {
    var BookModel = require('../../../app/models/book')

    // var jude = BookModel.findByPath('jude')
    // expect(BookModel.findNextChapter(jude,1).get('chapter')).toBe(1)

    // var romans = BookModel.findByPath('romans')
    // expect(BookModel.findNextChapter(romans,1).get('book')).toBe(romans)
  })
})
