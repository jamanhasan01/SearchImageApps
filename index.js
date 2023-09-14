//this key for access unsplash all image
const accessKey="QvHn6fLTBqsgbabTDcNrPzLeUthljTfl5rLxejqwb6Y"
//image apps dom
const fromEl=document.querySelector("form")
const inputEl=document.querySelector("input")
const imageWrapperBox=document.querySelector(".imageBoxwrapper")
const showMoreBtn=document.querySelector("#showMoreBtn")


let inputData=""
let page=1;

//searchImage function create

async function searchImageFunc() {
    inputData=inputEl.value
    let url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    let response=await fetch(url)
    let data=await response.json()
    
    let results=data.results
    if (page===1) {
        imageWrapperBox.innerHTML=""
    }
    results.map((result)=>{
        //create element dainamicly

        const imageWrapper=document.createElement("div")
        imageWrapper.classList.add("singleImageBox")

        const image=document.createElement("img")
        image.src=result.urls.small
        image.alt=result.alt_description

        const imageLink=document.createElement("a")
        imageLink.href=result.links.html
        imageLink.target="_blank"
        imageLink.textContent=result.alt_description

        //input all element in image div

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        imageWrapperBox.appendChild(imageWrapper)
    })
    page++
    if (page > 1) {
        showMoreBtn.style.display="block"
    }
}
fromEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    page=1
    searchImageFunc()
})
showMoreBtn.addEventListener("click",()=>{
   searchImageFunc()
})