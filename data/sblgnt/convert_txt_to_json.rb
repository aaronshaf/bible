require 'json'

Dir.glob("txt/*.txt").each do |file|
  passages = {}
  totalPassages = 0
  totalChapters = 0
  book = ""
  greekBookName = ""
  File.open(file).each_with_index do |line, index|
    if index == 0
      greekBookName = line.delete('\n').delete('\b').strip!
      next
    end
    line = line.split
    next if line.length == 0
    totalPassages = totalPassages + 1
    book = line.slice!(0)
    passage = line.slice!(0)
    totalChapters = passage.split(':')[0].to_i
    verse = line.join(" ")
    passages[passage] = verse
  end

  puts "book: #{book}"
  # filename = File.basename(file,".*")
  content = {
    "abbreviation" => book,
    "greek_name" => greekBookName,
    "totalChapters" => totalChapters,
    "totalPassages" => totalPassages,
    "passages" => passages
  }
  
  File.open("json/#{book}.json","w") do |fileToWrite|
    fileToWrite.write(JSON.pretty_generate(content))
  end
end

files = []
Dir.glob("json/*.json").each do |file|
  next if File.basename(file) == "index.json"
  files.push(File.basename(file))
end

File.open("json/index.json","w") do |fileToWrite|
  fileToWrite.write(JSON.pretty_generate(files))
end