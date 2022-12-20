document.addEventListener('DOMContentLoaded',()=>{
    
 addNewInstrumentalist()
 dropDownMenu()
 addBandList()
 displayBandDetails()

})
const bandNames=[]

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
            Accept:"application/json",
            mode:'no-cors',
        },
        body: JSON.stringify(detailsUpload)
    }

    

    if (instrument == 1){
        fetch("https://lorraineken.github.io/server/pianist.json",configurationObject)

    }
    else if(instrument == 2){
        fetch("https://lorraineken.github.io/server/guitarist.json",configurationObject)

    }
    else if(instrument == 3){
        fetch("https://lorraineken.github.io/server/drummer.json",configurationObject)
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
        fetch("https://lorraineken.github.io/server/pianist.json")
        .then((response) => response.json())
        .then((data) =>{
            const pianistDetails=data.pianist
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
        fetch("https://lorraineken.github.io/server/guitarist.json")
        .then((response) => response.json())
        .then((data) =>{
            const guitaristDetails=data.guitarist
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
        fetch("https://lorraineken.github.io/server/drummer.json")
        .then((response) => response.json())
        .then((data) =>{
            const drummerDetails=data.drummer
            const drummerNames=[] 
            const drummerBand=[]  
            for(item of drummerDetails){
                drummerNames.push(item.name)
                drummerBand.push(item.band)
            }
            for(let x=0;x<drummerNames.length;x++){
                const li =document.createElement('li')
                li.innerText = drummerNames[x]
                li.addEventListener("click",()=>{
                    p=document.createElement('p')
                    p.innerText=`Band name:${drummerBand[x]}`
                    li.appendChild(p)
                })
                drumPlayer.appendChild(li)
            }
        })
    })


}

//Display names of bands

function addBandList(){
    const displayBand =document.getElementById('band-names')

    fetch("https://lorraineken.github.io/server/bands.json")
    .then((response) => response.json())
    .then((bandData) => {
        const bandDetails=bandData.bandsList
        for(info of bandDetails){
            bandNames.push(info.name)
        }
        for(let i=0;i<bandNames.length;i++){
            const bName =document.createElement('p')
            const likeBtn=document.createElement('button')

            //Add likes to bands
            let like=0
            likeBtn.innerText=`${like} likes`
            likeBtn.addEventListener("click",()=>{
                likeBtn.innerText=`${++like} likes`
            })
            bName.innerText=`${i+1}. ${bandNames[i]}`
            bName.append(likeBtn)
            displayBand.appendChild(bName)

        }   
    })
}


//Display band details after search

function displayBandDetails(){
    const searchForm=document.getElementById("search-Band")

    searchForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        const searchInput = e.target.children[0].value

        const foundBand = bandNames.find((item)=> item===searchInput)

        if (foundBand){
            fetch("https://lorraineken.github.io/server/bands.json")
            .then((response) => response.json())
            .then((data) => {
                const bandDetails=data.bandsList
                for(let i=0;i<bandNames.length;i++){
                    if(foundBand === bandNames[i]){
                        const details=bandDetails[i]

                    const display=document.getElementById("displayBand-details")
                    const bandName =document.createElement('p')
                    const about =document.createElement('p')
                    const members =document.createElement('p')
                    const pastEvents =document.createElement('p')
                    const upcomingEvents =document.createElement('p')

                    bandName.innerText=`Band name: ${details.name}`
                    about.innerText=`About: ${details.about}`

                    // display members details
                    const mem=details.members
                    function membersObj(memObj = mem){
                        membersArray=[]
                        Object.entries(memObj).forEach(([key,value]) => {
                            const member=`${key}:${value}`
                            membersArray.push(member)
                        })
                        members.innerText=`Members: ${membersArray}`
                    }

                    //display pastEvents

                    const pEvents=details.past_events
                    function pastEventsObj(pastObj = pEvents){
                        pastEventArray=[]
                        Object.entries(pastObj).forEach(([key,value]) => {
                            const event=`${key}:${value}`
                            pastEventArray.push(event)
                        })
                        pastEvents.innerText=`Past Events: ${pastEventArray}`
                    }
                   
                    //display upcoming events
                    const upEvents=details.upcoming_events
                    function upcomingEventsObj(upObj = upEvents){
                        upcomingEventsArray=[]
                        Object.entries(upObj).forEach(([key,value]) => {
                            const event=`${key}:${value}`
                            upcomingEventsArray.push(event)
                        })
                        upcomingEvents.innerText=`Upcoming Events: ${upcomingEventsArray}`
                    }
                   
                    

                    display.appendChild(bandName)
                    display.appendChild(about)
                    membersObj()
                    display.appendChild(members)
                    pastEventsObj()
                    display.appendChild(pastEvents)
                    upcomingEventsObj()
                    display.appendChild(upcomingEvents)
                        
                    }

                }
            })
        }

 

    })

}