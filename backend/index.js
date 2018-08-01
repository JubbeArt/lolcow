const express = require('express')
const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request-promise-native')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/:board/:threadID', (req, res) => {
  fs.readFile(`${__dirname}/${req.params.threadID}.html`, (err, data) => {
    if (err) {
      res.send('404 - Not found')
      return
    }

    const $ = cheerio.load(data)

    const title = $('header h1').text()
    const board = $('[name=board]').attr('value')
    const op = $('.op p').attr('id')
    const subject = $('.subject').text()
    const posts = $('.post').map(function (index, element) {
      // TODO: replace with .contents()
      const bodyElements = $(this).find('.body').html().split('<br>')

      const body = bodyElements.map(line => {
        if (line.includes('<span class="quote"')) {
          return {quote: $('span', line).text().substring(1)}
        }
        if (line === '') {
          return {br: true}
        }
        if (line.includes('<a onclick="') && line.includes('&gt;&gt;&gt;')) {
          return {threadLink: $('a', line).text().substring(7)}
        }
        if (line.includes('<a onclick="')) {
          return {postLink: $('a', line).text().substring(2)}
        }

        return {text: line}
      })

      return {
        time: $(this).find('time').attr('datetime'),
        id: $(this).find('.intro').attr('id'),
        name: $(this).find('.name').text(),
        spoiler: $(this).find('.unimportant').text().includes('(Spoiler Image'),
        image: index === 0 ? $('.fileinfo a').first().text() : $(this).find('.fileinfo a').html(),
        body
      }
    }).get()

    res.json({
      op,
      subject,
      board,
      title,
      posts
    })
  })
})

app.listen(3000, () => {
  console.log('Serving on http://localhost:3000')
})
