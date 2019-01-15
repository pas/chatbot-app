#
# This script prepares data from
# https://www.kaggle.com/abhinavwalia95/entity-annotated-corpus#ner_dataset.csv
# to be used as training data for nlu to detect
# the intent person and the entitiy name. The
# corresponding data is named nlu-person.md.
#
# BE AWARE: This script overwrites the current nlu-person.md file!
#
# Never completly worked because the B-per tag does capture either
# prenames (Thomas, Sam, etc.) or prefixes (President, Mr., etc.)
#

require 'csv'

counter = 0;
sentence = "";
keep = false;

open('nlu-person.md', 'w') { |f|
  f.puts "## intent:person"
}

CSV.foreach("../raw/ner_dataset.csv", { headers: false , encoding: "ISO-8859-1" }) do |row|
  if row[0] != nil and row[0].include? "Sentence"
    if( keep )
	    open('nlu-person.md', 'a:UTF-8') { |f|
      f.puts sentence.to_s
      counter += 1
	  }
	end

    keep = false;
    sentence = "- " + row[1].to_s
  else
    sentence += (row[3] == "B-per" ? " [" : " ") + row[1].to_s

    if(row[3] == "B-per")
      sentence = sentence + "](name)"
      keep = true
    end
  end
end

puts counter.to_s
