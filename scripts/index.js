var marked = require('marked')
let ipc = require('electron').ipcRenderer


$(document).ready(() => {
    let fs = require('fs')
    let parseJSON = require('json-parse-async')
    let randomstring = require('randomstring')
    
    let sidelist = document.getElementById('sidelist')
    sidelist.innerHTML = ""
    let button = document.getElementById('addnota')
    let titleInput = document.getElementById('title')
    
    
    //I'll use this to store the note so that I can pass in the functions
    let currentNota = null
    
    let notae = {}
    
    titleInput.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            console.log("Key code 13")
            name(currentNota.id, titleInput.value)
        }
    })
    
    
    
    
    fs.readFile('./notae.json', 'utf-8', (err, data) => {
        if (err) throw err
        parseJSON(data, (err, datae) => {
            if (err) throw err
            notae = datae
            currentNota = notae.notae[0]
            open(currentNota.id)
            loadSidebar(notae, currentNota.id)
        })
    })
    
    
    button.addEventListener('click', () => {
        let obj = {
            name: '',
            date: new Date().toDateString(),
            file: randomstring.generate() + '.md',
            id: notae.notae.length
        }
        
        fs.writeFile(`./notae/${obj.file}`, "# This is an empty file", 'utf-8', err => {
            if (err) throw err
        })
        
        notae.notae.push(obj)
        writeMetadata()
    })
    
    ipc.on('save', () => {
        //save
        console.log($('#input').val())
        fs.writeFile('./notae/' + currentNota.file, $('#input').val(), 'utf-8', (err) => {
            if (err) throw err
        })
        //show save banner
    })
    
    
    
    function loadSidebar(notae, id) {
        $('#sidelist').empty()
        for (var i = 0; i < notae.notae.length; i++) {
            var string = ''
            if (i == id) {
                string = '<li class="sideitem active"> <h5>' + notae.notae[i].name + '</h5> <p>' + notae.notae[i].date + '</p> </li>\n'
            } else {
                string = '<li class="sideitem"> <h5>' + notae.notae[i].name + '</h5> <p>' + notae.notae[i].date + '</p> </li>\n'
            }
            console.log(string)
            $('#sidelist').append(string)
        }
        
        $('.sideitem').click(function(){
            var index = $(this).index()
            console.log(index)
            currentNota = notae.notae[index]
            open(currentNota.id)
            $('.sideitem').removeClass('active')
            $(this).addClass('active')
            
            
        })
    }
    
    function open(nota) {
        fs.readFile('./notae/' + notae.notae[nota].file, 'utf-8', (err, data) => {
            if (err) throw err
            var input = $('#input')
            input.val(data)
            var preview = marked(input.val())
            $('#preview').empty()
            $('#preview').append(preview)
        })
    }
    
    
    function writeMetadata() {
        console.log("Writing metadata")
        fs.writeFile('./notae.json', JSON.stringify(notae, null, 4), 'utf-8', (err) => {
            if (err) throw err
            console.log("Written metadata")
        })
        loadSidebar(notae, currentNota.id)
    }
    
    function name(nota, newVal) {
        console.log("Renaming")
        notae.notae[nota].name = newVal
        renameFile(nota)
        writeMetadata()
    }
    
    function renameFile(nota) {
        let newName = notae.notae[nota].name.split(' ').join('-')
        /*fs.rename(`./notae/${notae.notae[nota].file}.md`, `./notae/${newName}.md`, err => {
            if (err) throw err
            notae.notae[nota].file = newName
            writeMetadata()
        })*/
    }
})
