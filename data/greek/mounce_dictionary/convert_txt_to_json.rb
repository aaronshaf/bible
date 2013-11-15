# encoding: UTF-8
require 'json'
require 'unicode'

lastLine = []
data = {}

File.open("txt/main.txt").each_with_index do |line, index|
  if line[0..1] == "GK"
    line = line.gsub(/\p{Z}/, ' ').gsub(/\s+/, ' ')
    lastLine = line.split(' ')
  elsif line[0..4] == "<def>"
    strongs = lastLine[1].split('G')[1]
    gk = lastLine[4].split('G')[1]
    lemma = Unicode::normalize_C(lastLine[5])

    line = line.gsub(/\p{Z}/, ' ').gsub(/\s+/, ' ')
    tmp1 = line.split('</def>')
    definition = tmp1[0].split('<def>')[1].strip

    data[lemma] = {
      "strongs" => strongs.to_i,
      "gk" => gk.to_i,
      "definition" => definition
    }
  end
end

File.open("json/main.json","w") do |fileToWrite|
  fileToWrite.write(JSON.pretty_generate(data))
end
