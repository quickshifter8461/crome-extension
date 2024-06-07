let myWebsites = []
const inputEl = document.getElementById("input-el")
const saveEl = document.getElementById("input-btn")
const tabEl = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-btn")
const websitesFromLocalStorage = JSON.parse(localStorage.getItem("myWebsites"))

if (websitesFromLocalStorage) {
    myWebsites = websitesFromLocalStorage
    save(myWebsites)
}

function save(websites) {
    let listItems =""
    for (let i = 0; i < websites.length; i++) {
        listItems += `
        <li class="mt-2">
            <a class="text-success" target="_blank" href="${websites[i]}">
                ${websites[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

saveEl.addEventListener("click", function(){
  myWebsites.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myWebsites", JSON.stringify(myWebsites))
  save(myWebsites)
})

tabEl.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myWebsites.push(tabs[0].url)
        localStorage.setItem("myWebsites", JSON.stringify(myWebsites))
        save(myWebsites)
    })
})

deleteEl.addEventListener("dblclick", function(){
    localStorage.clear()
    myWebsites = []
    save(myWebsites)
})

