require 'json'

books = {}

Dir.glob("txt/*.txt").each do |file|
  book = ""
  passage = ""

  File.open(file).each_with_index do |line, index|
    if line[0] == " "
      books[book]["passages"][passage] = books[book]["passages"][passage] + line
      next
    end
    line = line.split
    next if line.length < 4

    if(['Phm','Jud'].include?(line[0]))
      book = line.slice!(0)
      passage = line.slice!(0)
    elsif line[1].include?('Jn')
      book = line.slice!(0..1).join ''
      passage = line.slice!(0)
    elsif line[1].include?(':')
      book = line.slice!(0)
      passage = line.slice!(0)
    elsif line[2].include?(':')
      book = line.slice!(0..1).join ''
      passage = line.slice!(0)
    else
      next
    end

    # if passage == 'The'
    #   next
    # end

    if book == 'Titus'
      book = 'Tit'
    end

    verse = line.join(" ")
    if(!passage.include?(':'))
      passage = '1:' + passage
    end

    if(!books[book])
      books[book] = {
        "abbreviation" => book,
        "passages" => {}
      }
    end

    if(!books[book]["passages"])
      books[book]["passages"] = {}
    end

    books[book]["passages"][passage] = verse
  end
end

books.each do |book, content|
  File.open("json/#{book}.json","w") do |fileToWrite|
    fileToWrite.write(JSON.pretty_generate(content))
  end
end