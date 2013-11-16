require 'json'
require 'sanitize'
require 'tf_idf'

# def getBookNumber(bookAbbreviation)
#   bookAbbreviations.index bookAbbreviation
# end

def getBookAbbreviation(bookNumber)
  bookNumber = bookNumber.to_i
  bookAbbreviations = [
    'Ge','Ex','Le','Nu','Dt',
    'Jos','Jdg','Ru','1Sa','2Sa','1Ki','2Ki','1Ch','2Ch','Ezr','Ne','Es',
    'Job','Ps','Pr','Ec','So',
    'Is','Je','La','Eze',
    'Da','Ho','Joe','Am','Ob','Jon','Mic','Na','Hab','Zep','Hag','Zec','Mal',
    'Mt','Mk','Lk','Jn',
    'Ac','Ro','1Co','2Co',
    'Ga','Eph','Php','Col',
    '1Th','2Th','1Ti','2Ti','Tit','Phm', #Titus
    'Heb','Jas','1Pe','2Pe','1Jn','2Jn','3Jn','Jud',
    'Re'
  ]
  bookAbbreviations[bookNumber - 1]
end

def getConsistentPartOfSpeech(forms)
  consistentForm = nil
  forms.each do |form, data|
    if !consistentForm
      consistentForm = form[0..1]
    end
    if form[0..1] != consistentForm
      return nil
    end
  end
  consistentForm
end

bookData = {}

Dir.glob("../../words/json/*/*.json").each do |file|
  name = file
  wordData = {}
  corpus = []

  File.open(file, "r") do |file|
    wordData = JSON.load file
  end

  # puts wordData['forms'].length
  consistentPartOfSpeech = getConsistentPartOfSpeech(wordData['forms'])

  if !consistentPartOfSpeech or consistentPartOfSpeech != 'V-'
    next
  end

  # puts consistentPartOfSpeech

  puts '---'

  wordData['forms'].each do |form, data|
    data.each do |instance|
      reference = instance[0]
      book = reference[0..1].to_i
      chapter = reference[2..3].to_i
      verse = reference[4..5].to_i
      bookAbbreviation = getBookAbbreviation(book + 39)
      # puts "#{book} #{bookAbbreviation} #{chapter} #{verse}"
      if(!bookData[bookAbbreviation])
        bookFile = "../../leb/json/#{bookAbbreviation}.json"
        File.open(bookFile, "r") do |file|
          bookData[bookAbbreviation] = JSON.load file
        end
      end
      passage = bookData[bookAbbreviation]['passages'][chapter.to_s + ":" + verse.to_s]
      if passage
        passage = Sanitize.clean(passage).tr(".,[]\\\"",'').split
        corpus = corpus + passage
      end
    end
  end

  if corpus.length > 50
    # puts JSON.pretty_generate(corpus)
    

    puts '----'
    puts '----'
    puts '----'
    puts name
    metrics = TfIdf.new([corpus])
    puts metrics.tf[0].sort_by {|_key, value| value}.reverse
  end

  # for every form
    # for every reference
      # load the verse
        # consider only the same partOfSpeech
        # add to word hash

  # was there an outlier?

end