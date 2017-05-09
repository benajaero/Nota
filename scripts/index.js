let fs = require('fs')
let parseJSON = require('json-parse-async')

let sidelist = document.getElementById('sidelist')
sidelist.innerHTML = ""
let button = document.getElementById('addnota')



let notae = {}


fs.readFile('./notae.json', 'utf-8', (err, data) => {
    if (err) throw err
    parseJSON(data, (err, datae) => {
        if (err) throw err
        notae = datae
        
        loadSidebar(notae)
    })
})


button.addEventListener('click', () => {
    let obj = {
        name: '',
        date: '',
        file: ''
    }
    notae.notae.push(obj)
    writeMetadata()
})

function loadSidebar(notae) {
    sidelist.innerHTML = ''
    for (var i = 0; i < notae.notae.length; i++) {
        sidelist.innerHTML = sidelist.innerHTML + `<li class='sideitem'> <h5>${notae.notae[i].name}</h5> <p> ${notae.notae[i].date} </p> </li>`
    }
}


function writeMetadata() {
    fs.writeFile('./notae.json', JSON.stringify(notae), 'utf-8', (err) => {
        if (err) throw err
        console.log("Written metadata")
    })
    loadSidebar(notae)
}

function name(nota, newVal) {
    notae.notae[nota].name = newVal
    renameFile(nota)
    writeMetadata()
}

function renameFile(nota) {
    
}