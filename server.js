import express from "express"
import bodyParser from "body-parser"
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

const blogs = {}

app.get('/', (req, res) => {
  res.render("homepage.ejs",{blogs:blogs})
})

app.get('/create',(req,res)=>{
    res.render("create.ejs")
})

app.post('/homepage',(req,res)=>{
  let title = req.body.title
  let content = req.body.content
  blogs[title]=content;
  res.render("homepage.ejs",{blogs:blogs})
})

app.get('/blogs/:blogName', (req, res) => {
  let blogName = req.params.blogName;
  // console.log(blogName)
  // console.log(blogs[blogName])
  if (blogs[blogName]) {
    const blogContent = blogs[blogName];
    res.render('./base/blog.ejs', { blogName, blogContent });
  } else {
    res.status(404).send('Blog Content Data not found');
  }
});

app.listen(port, () => {
  console.log(`Listening to localhost:${port}`)
})