# encoding: UTF-8

def convertToCharCodes(str)
  codes = []
  str.each_char do |c|
    codes.push c.unpack("U*")
  end
  return codes.join('-')
end

def convertFromCharCodes(str)
  string = ""
  str.split('-').to_a.each do |code|
    string = string + code.to_i.pack('U*')
  end
  return string
end

codes = convertToCharCodes("κόσμον")
puts codes

string = convertFromCharCodes(codes)
puts string
