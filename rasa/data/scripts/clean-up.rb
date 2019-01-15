#
# The intention of this file was
# to find characters that are not
# UTF-8 compatible
#

found = false
counter = 0

File.open("../raw/ner_dataset.csv", "r:ISO-8859-1") do |f|
  f.each_line do |line|
    counter += line.length

    if(counter > 22000 and not found)
      puts line
      found = true
    end
  end
end
