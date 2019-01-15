#
# The data from
# https://www.bfs.admin.ch/bfs/de/home/statistiken/bevoelkerung/geburten-todesfaelle/vornamen-schweiz.assetdetail.5946318.html
# was previously converted to csv with:
# https://www.zamzar.com/convert/xls-to-csv/
#

require 'csv'

CSV.foreach("../raw/prenames-switzerland.csv") do |row|
  open('lookup_prenames.txt', 'a') do |f|
    f.puts "- " + row[1].to_s
  end
end
