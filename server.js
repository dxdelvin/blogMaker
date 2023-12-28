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

app.post('/updatePage',(req,res)=>{
  let title = req.body.title
  let blogName = req.body.blogName;
  console.log(blogName);
  let content = req.body.content
  blogs[title]=content;
  delete blogs[blogName]
  res.render("homepage.ejs",{blogs:blogs})
})

app.post('/homepage',(req,res)=>{
  let title = req.body.title
  let content = req.body.content
  blogs[title]=content;
  res.render("homepage.ejs",{blogs:blogs})
})

app.post('/update',(req,res)=>{
  const updateType = req.body.action;
  // console.log(updateType)
  const blogtodelete = req.body.blogName
  const blogCont = req.body.blogContent
  if (updateType === "delete"){
    // console.log(blogtodelete)
    delete blogs[blogtodelete]
    res.redirect("/")
  }else{
    res.render('./update.ejs',{name:blogtodelete,content:blogCont})
  }
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