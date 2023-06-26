const API_KEY="7f8509ce1d04421698351a242b2f7811";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("India"));
 async function fetchNews(query)
 {
   const response= await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data=await response.json();
   bindData(data.articles);
 }
 function bindData(articles)
 {
    const cardContainer=document.getElementById("card-container");
    const templatecard=document.getElementById("template-card");
    cardContainer.innerHTML="";
    articles.forEach((article)=>{
    if(!article.urlToImage)
     return;
     const cardClone=templatecard.content.cloneNode(true);
     addData(cardClone,article);
     cardContainer.appendChild(cardClone);
   });
 }
 function addData(cardClone,article)
 {
    const Img = cardClone.querySelector("#header_img");
    const Title = cardClone.querySelector("#title");
    const Source = cardClone.querySelector("#source");
    const Desc = cardClone.querySelector("#desc");
    Img.src=article.urlToImage;
    Title.innerHTML=article.title;
    const auth=article.source.name;
    const date=new Date(article.publishedAt).toLocaleString("en-Us",{
        timeZone:"Asia/Jakarta"
    });
    Source.innerHTML=`${auth}.${date}`;
    Desc.innerHTML=article.description;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
  }
 let currentSelected=null;
function makeActive(topic)
{   
    fetchNews(topic);
    const navItem=document.getElementById(topic);
    currentSelected?.classList.remove('active');
    currentSelected=navItem;
    currentSelected.classList.add('active');
}
const btn=document.getElementById("search-button");
const txt=document.getElementById("search-input");
btn.addEventListener("click",()=>{
    const query=txt.value;
    if(!query)
    return;
    fetchNews(query);
    console.log(query);
    currentSelected?.classList.remove("active");
    currentSelected=null;
  }
  );
