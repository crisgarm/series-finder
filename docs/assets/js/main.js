"use strict";const input=document.querySelector(".js-input"),button=document.querySelector(".js-button"),listContainer=document.querySelector(".js-list"),listFavourites=document.querySelector(".js-list-favourites"),paragraph=document.querySelector(".js-paragraph");let dataResults=[],listFav=[],localFav={};function search(){""===input.value?paragraph.innerHTML="You must enter a TV show name":(paragraph.innerHTML="",getInfoFromApi())}function getInfoFromApi(){fetch("//api.tvmaze.com/search/shows?q="+input.value).then(t=>t.json()).then(t=>{dataResults=t,paintSearch(),listenItem()})}function paintSearch(){listContainer.innerHTML="";for(let t=0;t<dataResults.length;t++){const e=document.createElement("li"),a=document.createElement("img"),i=document.createElement("p"),s=document.createTextNode(""+dataResults[t].show.name);if(listContainer.appendChild(e),e.classList.add("js-item"),e.classList.add("list__item"),e.setAttribute("id",""+dataResults[t].show.id),null===dataResults[t].show.image)a.setAttribute("src","//via.placeholder.com/210x295/ffffff/666666");else{const e=dataResults[t].show.image.medium.replace("http:","");a.setAttribute("src",e)}e.appendChild(a),a.classList.add("list__item--image"),e.appendChild(i),i.appendChild(s),i.classList.add("list__item--title")}}function paintFavourites(){listFavourites.innerHTML="";for(let t=0;t<listFav.length;t++){const e=document.createElement("li"),a=document.createElement("img"),i=document.createElement("p"),s=document.createTextNode(""+listFav[t].name);if(listFavourites.appendChild(e),e.classList.add("list__item--favourite"),e.setAttribute("id",""+listFav[t].id),null===listFav[t].image)a.setAttribute("src","//via.placeholder.com/210x295/ffffff/666666");else{const e=listFav[t].image.medium.replace("http:","");a.setAttribute("src",e)}e.appendChild(a),a.classList.add("list__item--favourite-image"),e.appendChild(i),i.appendChild(s),i.classList.add("list__item--favourite-title")}}function addFav(t){const e=document.getElementById(t);e.classList.remove("list__item"),e.classList.add("list__item--favourite")}function removeFav(t){const e=document.getElementById(t);e.classList.remove("list__item--favourite"),e.classList.add("list__item")}function favouriteSeries(t){for(let e=0;e<dataResults.length;e++)t.currentTarget.id==dataResults[e].show.id&&(localFav={id:dataResults[e].show.id,name:dataResults[e].show.name,image:dataResults[e].show.image});const e=parseInt(t.currentTarget.id),a=listFav.findIndex(e=>e.id==t.currentTarget.id);!0===(-1===a)?(listFav.push(localFav),addFav(e),paintFavourites(),listenFav()):(listFav.splice(a,1),paintFavourites(),listenFav(),removeFav(e)),setInLocalStorage()}function showContent(t){for(let e=0;e<listFav.length;e++)t.currentTarget.id==listFav[e].id&&console.log(listFav[e].name)}function listenFav(){const t=document.querySelectorAll(".list__item--favourite");for(const e of t)e.addEventListener("click",showContent)}function listenItem(){const t=document.querySelectorAll(".js-item");for(const e of t)e.addEventListener("click",favouriteSeries)}function setInLocalStorage(){localStorage.setItem("favourites",JSON.stringify(listFav))}function getFromLocalStorage(){const t=localStorage.getItem("favourites"),e=JSON.parse(t);null===e?getInfoFromApi():(listFav=e,paintFavourites(),listenFav())}button.addEventListener("click",search),getFromLocalStorage();