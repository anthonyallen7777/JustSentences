const { parse } = require('csv-parse');
const fs = require('fs') 
const JishoAPI = require('unofficial-jisho-api');
const XRegExp = require('xregexp');
var rx = new XRegExp("^[-\\w\\p{Hiragana}\\p{Katakana}\\p{Han}\u3002]+");
//                      english  hiranga     katakana    kanji  period
var hiragana = new XRegExp("[-\\p{Hiragana}]+", "g")
var kanji = new XRegExp("[-\\p{Han}]", "g")
var english = new XRegExp("[-\\w]+", 'g');

var numbers = new XRegExp("[0-9]+");
//var testSentence = '今日は６月１８日で、ムーリエルの誕生日です！'
//console.log(testSentence.match(kanji).join(""))
//console.log(testSentence.match(kanji))

const jisho = new JishoAPI();

const data = []
var num = 0

//kanjiOnlySentences.tsv
//allSentences.tsv
//nonKanjiSentences.tsv

var LineByLineReader = require('line-by-line'),
lr = new LineByLineReader('jpn_sentences_test.tsv');

//lr.pipe(parse({delimiter: 'jpn',relax_quotes: true,ltrim:true}))

lr.on('error', function (err) {
  // 'err' contains error object
  console.log(err)
});

lr.on('line', function (r) {
  // pause emitting of lines...
  lr.pause();
  // ...do your asynchronous line processing..
  setTimeout(function () {
    var sentence = r.split("jpn")
    var kanjiArray
    var kanjiNumbers = sentence[0].match(numbers)[0]

    if (kanji.test(sentence[1])) {
      num += 1
      kanjiArray = sentence[1].match(kanji)
      kanjiArray = [...new Set(kanjiArray)]

      var jlptLast = null
      const loopArr = async () => {
        for (let i = 0; i < kanjiArray.length; ++i) {
          await jisho.searchForKanji(kanjiArray[i]).then(result => {
            if (result != null && result != undefined) {
              if (result.jlptLevel != null && result.jlptLevel != undefined) {
                if (i == 0) {
                  jlptLast = result.jlptLevel[1]
                }
                else if (jlptLast > result.jlptLevel[1]) {
                  jlptLast = result.jlptLevel[1]
                }
                if (i == kanjiArray.length-1) {
                  console.log(kanjiNumbers + "\t"+"N"+jlptLast+"\t"+sentence[1]+"\n")
                  fs.writeFileSync('kanjiOnlySentences.tsv',
                    kanjiNumbers + "\t"+"N"+jlptLast+"\t"+sentence[1]+"\n",{flag: 'a'})
                }
              }
            }
          }).catch(err => {
            console.log(err.code)
            console.log(err.message)
            console.log(err.stack)
          });
        }
      }
      loopArr()

    } else {
      num += 1
      console.log(kanjiNumbers + "\t"+"jpn"+"\t"+sentence[1]+"\n")
      fs.writeFileSync('nonKanjiSentences.tsv',
        kanjiNumbers + "\t"+"jpn"+"\t"+sentence[1]+"\n",{flag: 'a'})
    }
    console.log(num)
    // ...and continue emitting lines.
    lr.resume();
  }, 800);
});

lr.on('end', function () {
  //console.log(num)
  // All lines are read, file is closed now.
});