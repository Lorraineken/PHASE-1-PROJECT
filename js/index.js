document.addEventListener('DOMContentLoaded',()=>{
 addNewInstrumentalist()
 dropDownMenu()

 

})

// Adding details of new instrumentalist
function addNewInstrumentalist(){

    const formDetails=document.querySelector(`#add-details`)
 console.log(formDetails)

 formDetails.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = e.target.children[2].value
    const instrument =e.target.children[4].value
    const bandName = e.target.children[6].value

    const detailsUpload={
         name:`${name}`,
         band:`${bandName}`
    }

    const configurationObject ={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body: JSON.stringify(detailsUpload)
    }

    if (instrument == 1){
        fetch("http://localhost:3000/pianist",configurationObject)

    }
    else if(instrument == 2){
        fetch("http://localhost:3000/guitarist",configurationObject)

    }
    else if(instrument == 3){
        fetch("http://localhost:3000/drummer",configurationObject)
    }

 })
}

//Dropdown details for the instrumentalist

function dropDownMenu(){
    const pianoPlayer=document.getElementById("piano")
    const guitarPlayer=document.getElementById("guitar")
    const drumPlayer=document.getElementById("drummer")

    const li =document.createElement('li')
   

    pianistBtn=document.getElementById('pianist-button')

    pianistBtn.addEventListener('click',()=>{
        fetch("http://localhost:3000/pianist")
        .then((response) => response.json())
        .then((pianistDetails) =>{
            const a =document.createElement('a')
            a.className="dropdown-item"
            a.href="#"
            for(item of pianistDetails){
                console.log(item.name)
                a.textContent=item.name
                
                //li.innerHTML=<a class="dropdown-item" href="#">item.name</a>


            }
            li.appendChild(a)
            pianoPlayer.appendChild(li)
            console.log(pianoPlayer)
        })
    })
}