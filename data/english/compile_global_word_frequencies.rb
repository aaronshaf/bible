require 'json'
require 'sanitize'
require 'ruby-progressbar'

progressbar = ProgressBar.create(:title => "Processing LEB", :starting_at => 0, :total => 65)

words = {}
verses = 0

Dir.glob("../leb/json/*.json").each do |filename|
  book = ""
  passage = ""

  File.open(filename, "r") do |file|
    data = JSON.load file
    data['passages'].each do |reference,passage|
      passageWords = Sanitize.clean(passage).gsub('--',' ').tr(".;,[]()'!?{}\\\"",'').split
      passageWords.each do |word|
        word = word.downcase
        if !words[word]
          words[word] = 1
        else
          words[word] += 1
        end
      end
    end
  end
  progressbar.increment
end

words = Hash[words.sort]
words = Hash[words.sort_by{|k, v| v}.reverse]

File.open("../leb/word_frequencies.json","w") do |fileToWrite|
  fileToWrite.write(JSON.pretty_generate(words))
end