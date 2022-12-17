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
    const pianistBtn=document.getElementById('pianist-button')
    const guitaristBtn =document.getElementById('guitarist-button')
    const drummerBtn = document.getElementById('drummer-button')

    pianistBtn.addEventListener('click',()=>{
        fetch("http://localhost:3000/pianist")
        .then((response) => response.json())
        .then((pianistDetails) =>{
            console.log(pianistDetails)
            const pianistNames=[]
            const pianistBand=[]   
            for(item of pianistDetails){
                pianistNames.push(item.name)
                pianistBand.push(item.band)
            }
            for(let x=0;x<pianistNames.length;x++){
                const li =document.createElement('li')
                li.innerText = pianistNames[x]
                li.addEventListener("click",()=>{
                    p=document.createElement('p')
                    p.innerText=`Band name:${pianistBand[x]}`
                    li.appendChild(p)
                })
                pianoPlayer.appendChild(li)
            }
        })
    })

    guitaristBtn.addEventListener('click',()=>{
        fetch("http://localhost:3000/guitarist")
        .then((response) => response.json())
        .then((guitaristDetails) =>{
            const guitaristNames=[]
            const guitaristBand=[]   
            for(item of guitaristDetails){
                guitaristNames.push(item.name)
                guitaristBand.push(item.band)
            }
            for(let x=0;x<guitaristNames.length;x++){
                const li =document.createElement('li')
                li.innerText = guitaristNames[x]
                li.addEventListener("click",()=>{
                    p=document.createElement('p')
                    p.innerText=`Band name:${guitaristBand[x]}`
                    li.appendChild(p)
                })
                guitarPlayer.appendChild(li)
            }
        })
    })

    drummerBtn.addEventListener('click',()=>{
        fetch("http://localhost:3000/drummer")
        .then((response) => response.json())
        .then((drummerDetails) =>{
            const drummerNames=[]   
            for(item of drummerDetails){
                drummerNames.push(item.name)
            }
            for(let x=0;x<drummerNames.length;x++){
                const li =document.createElement('li')
                li.innerText = drummerNames[x]
                drumPlayer.appendChild(li)
            }
        })
    })

}