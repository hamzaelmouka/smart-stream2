const list= document.getElementById("channel");
const img=document.getElementById("img");
const select=document.getElementById("select");
const loadin=document.getElementById("loading");
const error=document.getElementById("erour");

export function affichage(channels){
    list.innerHTML="";
    channels.forEach(element => {
        list.innerHTML+=`
        <div  data-id="${element.id}" class="flex items-center gap-3 mx-2 my-1.5 p-2.5  bg-slate-800  rounded-xl  hover:brightness-125">
            <span class="w-12 text-center text-sm font-bold text-slate-300">${element.channelNumber}</span>
            <img src="${element.logo}" alt="" class="w-12 h-11 shrink-0 rounded-lg object-cover bg-slate-700" />
            <div class="min-w-0 flex-1">
                <p class="namee truncate font-semibold text-white">${element.name}</p>
                <p class="truncate text-xs text-slate-400">${element.category}</p>
            </div>
            <div class="ml-auto flex gap-2">
                <button data-action="favorite" class="text-amber-400 p-2 rounded-full   hover:bg-slate-600 ">
                    ${element.isFavorite ? "★" : "☆"}
                </button>
                <button data-action="blacklisted" class=" ${element.isBlacklisted ? ' font-bold ' : ''} p-2 rounded-full text-red-500  hover:bg-slate-600 ">
                    ${element.isBlacklisted ? "↻" : "🚫"}
                </button>
                <button  class="p-2 rounded-full text-red-500  hover:bg-slate-600 ">
                    ${element.isBlacklisted ? "🗑️" : "📝"}
                </button>
            </div>
        </div>
        `
    });
}

export function selectionn(cate){
    cate.classList.add("bg-blue-600","border-blue-400");
    cate.classList.remove("bg-slate-800");
}

export function selectio(cate){
    cate.classList.remove("bg-blue-600","border-blue-400");
    cate.classList.add("bg-slate-800");
}
export function affichagePrevi(channel){
    img.innerHTML=`
    <img class="w-full h-130 object-cover rounded-2xl " src="${channel.previewImage}">
    <h1 class="mt-4 text-3xl font-bold text-amber-50">${channel.channelNumber}-${channel.name}</h1>
    `;
}

export function selecte(data){
    if(!select)return;
    select.innerHTML="";
    select.innerHTML=`<option id="" class="w-10" value="" >les category </option>`
    data.forEach(function(element){
        let valid=true;
        Array.from(select.options).forEach(function(e){
            if(element.category===e.value){
                valid=false
            }
        })
        if(valid){
            select.innerHTML+=`<option class="w-7" id="" value="${element.category}">${element.category}</option>`
        }
    })
}

export function loading(loadi){
    loadin.classList.toggle("hidden",loadi);
}
export function errour(err ,mesage){
    error.textContent=mesage;
    error.classList.toggle("hidden",err)
}