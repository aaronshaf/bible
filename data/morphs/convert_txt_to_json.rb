require 'json'

books = nil

Dir.glob("txt/*.txt").each do |file|
  data = []
  # book = ""
  # chapter = ""
  lastVerse = ""

  File.open(file).each_with_index do |line, index|
    line = line.split
    book = line[0].slice(0,2)
    chapter = line[0].slice(2,2)
    verse = line[0].slice(4,2)

    # puts JSON.pretty_generate(line)

    if(!File.directory?("json/" + book))
      Dir::mkdir("json/" + book)
    end

    if(!File.directory?("json/" + book + "/" + chapter))
      Dir::mkdir("json/" + book + "/" + chapter)
    end

    if(lastVerse != verse)
      filename = "json/" + book + "/" + chapter + "/" + verse + ".json"
      File.open(filename,"w") do |fileToWrite|
        fileToWrite.write(JSON.generate(data))
      end
      data = []
    end

    data.push(line.slice(1,6))

    lastVerse = verse
  end
end

