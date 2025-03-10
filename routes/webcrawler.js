const { Worker, isMainThread, parentPort }  = require('worker_threads');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();
const url = "https://www.thairath.co.th/news/politic/2842217";
count=0;
web_title="";
article_title="";
article_content_part_1="";
article_content_part_2="";
article_image="";

router.post('/', async function(req, res, next) {
    await fetchData(req.body.url);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({status:true, data:{
        web_title: web_title,
        article_title: article_title,
        article_content_part_1: article_content_part_1,
        article_content_part_2: article_content_part_2,
        article_image: article_image
    }}));
   
    res.end();
    
});

async function fetchData(url){

    console.log('my url=',url);

    if (count==0) 
    {
     let response = await axios(url).catch((err) => console.log(err));
     if (response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
     }
    const html = response.data;
    const web_data = cheerio.load(html);
    process.stdout.write("***\n");
    process.stdout.write("Web Title:");
    const titles = web_data('title');
    titles.each((i, element) => {
        if (i==0){
         process.stdout.write(web_data(element).text());
         //res.json({ "Web Title": web_data(element).text()});
         web_title = web_data(element).text();
        }
    });
    process.stdout.write('\n***\n');
    process.stdout.write("Article Title:");
    const article_titles = web_data('.__item_article-headline.css-mrn4hq.e1wlf1s67 > h1');
    article_titles.each((i,element) => {
        if (i==0){
            process.stdout.write(web_data(element).text());
            //res.json({ "Article Title": web_data(element).text() });
            article_title = web_data(element).text();
           }
    });
    process.stdout.write('\n***\n');

    process.stdout.write("Article Content Part 1:");
    const article_contents = web_data('.__item_article-content.css-1nsa2wl.e1wlf1s615 > div > div');
    article_contents.each((i,element) => {
        if (i == 0)
        {
         process.stdout.write(web_data(element).text());
         process.stdout.write('\n***\n');
         article_content_part_1 = web_data(element).text();
        } 
        if (i == 1)
        {
         process.stdout.write("Article Content Part 2:");
         process.stdout.write(web_data(element).text());
         article_content_part_2 = web_data(element).text();
         process.stdout.write('\n***\n');
        }
    });
    //process.stdout.write('\n');
    process.stdout.write("Article Image:");
    const article_images = web_data('.__item_article-highlight-image.css-v63hmo.e1wlf1s62 > div > picture');
    article_images.each(function(i,element) {
        if (i==0)
        {
         let image=  web_data(element).find('img').attr('src'); 
         process.stdout.write(image);
         article_image = image;
        }
    });
    process.stdout.write('\n***\n');
    count++;
    }
}

module.exports = router;