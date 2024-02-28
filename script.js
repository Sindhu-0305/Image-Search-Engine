const searchform=document.getElementById("searchform");
const searchbox=document.getElementById("searchbox");
const searchresult=document.getElementById("searchresult");
const showmore=document.getElementById("showmore");
const accessKey="Yr_QifmIdVkISSCuEgPYZIlIrPPgoxql2bodmFVKuaE";
let keyword="";
let page=1;
/*async: The async keyword is used to declare that a function will operate asynchronously. When a function is declared as async, it always returns a promise. This allows you to use the await keyword within the function to wait for promises to resolve or reject before continuing execution.
await: The await keyword is used to pause the execution of an async function until a promise is settled (either fulfilled or rejected). It can only be used within async functions.*/
async function searchimages(){
    keyword=searchbox.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
     const response=await fetch(url);
     const data=await response.json();/*(JavaScript Object Notation). */
     /*By using await, the code waits for the fetch() request to complete and for the server to respond with data.
After the response is received, the code waits for the data to be parsed as JSON using response.json().
Once the data is successfully parsed, it is stored in the variable data and can be used further in the code.*/
    //   console.log(data);
    if(page==1){
        searchresult.innerHTML=""; //on searching another images the other images seems to appear below the already searched images to hid the already searched images it is necessary to check if the page no is 1 
        //so if it is 1 the hide the already existing searchresult's innerhtml.
    }
    
    
    const results=data.results;


    /*result in map is a parameter where map() method in JavaScript to iterate over each element in the results array. */
    results.map((result)=>{/*results,urls,small,html,links all those related to the names in the api */
        const image=document.createElement("img");/* create a new element with a img tag*/
        image.src=result.urls.small;/*adds new image in that created image tag*/
        const imagelink=document.createElement("a");/*crete new element a tag to display image in new tab on click*/
        imagelink.href=result.links.html;
        imagelink.target="_blank";/*opns in new tab */
        imagelink.appendChild(image);/*image will be inside the image link */
        searchresult.appendChild(imagelink);/*imagelink will be displayed in the div called serchresult */
  
  
    })
    showmore.style.display="block";

}
searchform.addEventListener("submit",(e)=>{
    e.preventDefault();// Prevents the default form submission behavior
    page=1;// Resets the page number to 1
    searchimages();
})
showmore.addEventListener("click",()=>{
    page++;//increases the page value by 1 on clicking showmore button
    searchimages();
})