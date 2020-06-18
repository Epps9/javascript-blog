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
  
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + getTitle + '</span></a></li>';

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













function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */
    var html = ''; 
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split('  ');
    
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"' + '>' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;
      
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  
  /* END LOOP: for every article: */
 }
}
generateTags();







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

  const hrefLinks = document.getAttribute('href'= href); //nie wiem jak to zrobić, można tak?

  /* START LOOP: for each found tag link */
    for(let hrefLink of hrefLinks) {

    /* add class active */
      let hrefLink.classList.add('active');
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










function generateAuthors(){
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
    const linkHTML = '<li><a href="#author-' + articleAuthor + '"' + '>' + articleAuthor + '</a></li>';

    /* add generated code to html variable */
    html = html + linkHTML;
      
    /* END LOOP: for every article */
    }
    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
  }
}
generateTags();









fucntion authorClickHandler (event) {

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

  const hrefLinks = document.getAttribute('href'= href); //to samo czyli nie wiem jak to zrobić :/

  /* START LOOP: for each found author link */
    for(let hrefLink of hrefLinks) {

    /* add class active */
      let hrefLink.classList.add('active');
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
    tagLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}