'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#tagCloudLink').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#authorListLink').innerHTML),
  };

  const opt = {
    ArticleSelector : '.post',
    TitleSelector : '.post-title',
    TitleListSelector : '.titles',
    ArticleTagsSelector : '.post-tags .list',
    ArticleAuthorSelector : '.post-author',
    TagsListSelector : '.tags.list',
    CloudClassCount : 5,
    CloudClassPrefix : 'tag-size-',
    AuthorsListSelector : '.authors'
  };

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

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link and
        find the correct article using the selector (value of 'href' attribute) and
        add class 'active' to the correct article */

    const articleId = clickedElement.getAttribute('href').slice(1);
    document.getElementById(articleId).classList.add('active');

  };

  const  generateTitleLinks = (customSelector = '') => {

    /* remove contents of titleList */
    const titleList = document.querySelector(opt.TitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);
    let html = '';
    for(let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* get the title from the title element */
      const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* insert link into titleList */
      html += linkHTML;
      //titleList.insertAdjacentHTML("beforeend",linkHTML);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();
  const calculateTagClass = ( count , params) => {
    return Math.floor((count - params.min) / (params.max - params.min) * (opt.CloudClassCount - 1) + 1);
  };

  const calculateTagsParams = (tag) =>{
    let tagArray =[];
    for (const key in tag) {
      tagArray.push(+tag[key]);
    }
    const max = Math.max(...tagArray);
    const min = Math.min(...tagArray);
    return {max , min};
  };

  const generateTags = () => {
    /* find all articles */
    let allTags = {};
    const articles = document.querySelectorAll(opt.ArticleSelector);
    /* START LOOP: for every article: */
    for (const article of articles) {
      /* find tags wrapper, make html variable with empty string, get tags from data-tags attribute, split tags into array */
      let tagHTML = '';
      const tags = article.getAttribute('data-tags').split(' ');

      /* START LOOP: for each tag */
      for (const tag of tags) {
        /* generate HTML of the link, add generated code to html variable */
        const linkHTMLData = {tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        tagHTML += linkHTML;

        if(!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag]=1;
        }
        else{
          allTags[tag]++;
        }
      }
      /* END LOOP: for each tag, insert HTML of all the links into the tags wrapper */
      article.querySelector(opt.ArticleTagsSelector).innerHTML = tagHTML;
    }

    /* END LOOP: for every article: */
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.TagsListSelector);
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

    }
    /* [NEW] END LOOP: for each tag in allTags: */
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  };

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = this.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    debugger
    const activelinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (const activelink of activelinks) {
      /* remove class active */
      activelink.classList.remove('active');
    }
    /* END LOOP: for each active tag link */
    /* find all tag links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll('a[href="'+ href +'"]');
    /* START LOOP: for each found tag link */
    for (const link of links) {
    /* add class active */
      link.classList.add('active');
    }
    /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  const addClickListenersToTags = () => {
    /* find all links to tags */
    const list = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (const tag of list) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  };

  addClickListenersToTags();

  const generateAuthor = () => {
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(opt.ArticleSelector);
    /* START LOOP: for every article: */
    for (const article of articles) {
      /* find tags wrapper, make html variable with empty string, get tags from data-tags attribute, split tags into array */
      let authorHTML = '';
      const author = article.getAttribute('data-author');
      /* generate HTML of the link, add generated code to html variable */

      const linkHTMLData = {
        author_id: author.replace(' ','-'),
        author: author,
      };

      authorHTML += templates.authorLink(linkHTMLData);
      if(!allAuthors[author]) {
        /* [NEW] add generated code to allTags array */
        allAuthors[author]=1;
      }
      else{
        allAuthors[author]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      article.querySelector(opt.ArticleAuthorSelector).innerHTML = authorHTML;
    }
    let allAuthorsHTMLData = {authors: []};
    for (const author in allAuthors) {
      allAuthorsHTMLData.authors.push({
        author_id: author.replace(' ','-'),
        author: author,
        count :allAuthors[author],
      });
    }
    /* END LOOP: for every article: */
    document.querySelector(opt.AuthorsListSelector).innerHTML = templates.authorListLink(allAuthorsHTMLData);
  };

  generateAuthor();

  function authorClickHandler(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const author = href.replace('#author-', '').replace('-',' ');
    /* find all authors links with class active */
    const activelinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for (const activelink of activelinks) {
      /* remove class active */
      activelink.classList.remove('active');
    }
    /* END LOOP: for each active tag link */
    /* find all tag links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll('a[href="'+ href +'"]');
    /* START LOOP: for each found tag link */
    for (const link of links) {
      /* add class active */
      link.classList.add('active');
    }
    /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  const addClickListenersToAuthors = () => {
    /* find all links to tags */
    const list = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for (const author of list) {
      /* add tagClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
    }
    /* END LOOP: for each link */
  };

  addClickListenersToAuthors();
}
