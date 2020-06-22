const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
}
{
  tagsLinksArticle: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML)
}
{ 
  tagsLinksAuthor: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}
{ tagCloudLink: Handlebars.compile(document.querySelector(''))

}




const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  
  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  
  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  
  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  
  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  
  /* add class 'active' to the correct article */
    
  targetArticle.classList.add('active');

};
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  optArticleTagsSelector = '.post-tags .list';
  optAuthor = '.post-author';
  optAuthorsWrapper = '.list .authors';
  optTagsListSelector = '.tags.list'
  optCloudClassCount = 5;
  optCloudClassPrefix = 'tag-size-';
  optAuthorsListSelector = '.list .authors';


  function generateTitleLinks(customSelector = ''){
    
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages(){
    titleList.innerHTML = '';
  } 
   
  clearMessages();
 
  /* for each article */
 
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
 
 
  /* get the article id */

  let html = '';
 
  for (let article of articles) {
    const articleId = article.getAttribute('id'); 
 
    /* find the title element */
 
    const articleTitle = article.querySelector(optTitleSelector);
     
    /* get the title from the title element */
 
    const getTitle = articleTitle.textContent;
  
    /* create HTML of the link */
  
    const linkHTMLData = {id: articleId, title: getTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('afterbegin', linkHTML);
    html = html + linkHTML;
  }

  titleList.innerHTML = html;   


  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
     
}

generateTitleLinks();













function calculateTagsParams (tags) {
  const params = {max = 0, min = 999999};
    for(let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      } else if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
}



function calculateTagClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix, classNumber;


}



function generateTags(){

  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = document.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    var html = '';
    
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split('  ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */

      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagsLinksArticle(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
    }

/* [NEW] find list of tags in right column */
const tagList = document.querySelector(.tags);


const tagsParams = calculateTagsParams(allTags);

  
/* [NEW] create variable for all links HTML code */
const allTagsData = {tags: []};

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){

  /* [NEW] generate code of a link and add it to allTagsHTML */


  allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });

  /*tutaj mam dodać atrybut class="" w generowanym kodzie HTMP linka*/

  const tagLinkHTML = '<li>' + 'class='calculateTagClass(allTags[tag], tagsParam) + '</li>';

  
}
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = templates.tagCloudLink(allTagsData);

generateTags ();







function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const links = document.querySelectorAll('a.active[href^="#tag-"]'); 

  /* START LOOP: for each active tag link */
  for(let link of links) {
    /* remove class active */
    link.classList.remove('active')

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const hrefLinks = article.getAttribute(href=${href}); 

  /* START LOOP: for each found tag link */
    for(let hrefLink of hrefLinks) {

    /* add class active */
      hrefLink.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a [href^="#tag-"]') 
  /* START LOOP: for each link */
  for(let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();










function calculateAuthorsParams (aritcleAuthors) {
  const params = {max = 0, min = 999999};
    for(let articleAuthor in articleAuthors){
      if(articleAuthors[articleAuthor] > params.max){
        params.max = tags[tag];
      } else if (articleAuthors[articleAuthor] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
}



function calculateAuthorsClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix, classNumber;
}


function generateAuthors(){

   /* [NEW] create a new variable allAuthors with an empty array */
   let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(article of articles) {

    /* find authors wrapper */
    const authorsWrapper = document.querySelector(optAuthorsWrapper);

     /* make html variable with empty string */
     var html = ''; 

     /* get authors from data-authors attribute */
     const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */

    const linkHTMLData = {author: articleAuthor};
    const linkHTML = templates.tagsLinksAuthor(linkHTMLData);

    /* add generated code to html variable */
    html = html + linkHTML;

     /* [NEW] check if this link is NOT already in allTags */
     if(!allAuthors[articleAuthor]) {
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
      
    /* END LOOP: for every article */
    }
    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
  }

/* [NEW] find list of tags in right column */
const tagList = document.querySelector(.authors);


const authorsParams = calculateAuthorsParams(allAuthors);

  
/* [NEW] create variable for all links HTML code */
let allAuthorsHTML = '';


}
generateAuthors();









function authorClickHandler (event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const links = document.querySelectorAll('a.active[href^="#author-"]'); 

  /* START LOOP: for each active author link */
  for(let link of links) {
    /* remove class active */
    link.classList.remove('active')

  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */

  const hrefLinks = article.getAttribute(href=${href}); 

  /* START LOOP: for each found author link */
    for(let hrefLink of hrefLinks) {

    /* add class active */
      hrefLink.classList.add('active');

  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}




function addClickListenersToAuthors(){

  /* find all links to authors */
  const authorLinks = document.querySelectorAll('a [href^="#author-"]') 

  /* START LOOP: for each link */
  for(let authorLink of authorLinks) {

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}









