import { getData, changee,deletee } from "../services/api.js";
import { affichage } from "../ui/afichage.js";
import { affichagePrevi ,selection ,selectionn,selectio } from "../ui/afichage.js";
import { selecte } from "../ui/afichage.js";
import { loading } from "../ui/afichage.js";
import { errour } from "../ui/afichage.js";

const list= document.getElementById("channel");
const search=document.getElementById("search");
const select=document.getElementById("select");
 
let channels=[];
let ruslt=[];
function liste(data){
    return ruslt=data.filter((p)=> p.isBlacklisted===false);
}
async function demarage() {
    loading(false);
    errour(true);
    try{
        channels=await getData();
        affichage(liste(channels));
        selecte(channels);
        selection();
    }catch(error){
        errour(false,error.message)
    }finally{
        loading(true)
    }
}
demarage();


select.addEventListener("change", () => {
    let result=channels;
    if(select.value!==""){
       result=channels.filter((p)=>p.category===select.value);
    }
    search.value="";
    affichage(result);
});

search.addEventListener("input",()=>{
    const put=search.value.trim().toLowerCase();
    const carts=document.querySelectorAll("[data-id]");

    carts.forEach((cart)=>{
        const namee=cart.querySelector(".namee");
        const text=namee.textContent.toLowerCase();
        // const elemen=channels.find((p)=>p.id===cart.dataset.id);
        // const name=elemen.name.toLowerCase();
        cart.classList.toggle("hidden",!text.includes(put));
    })
})

list.addEventListener("click",(e)=>{
const cart=e.target.closest("[data-id]");
const btn = e.target.closest('button');
if (btn){
    const channel=channels.find(({id})=>id===cart.dataset.id);
     const action = btn.dataset.action;
    if (action==='favorite') {
        changee(channel.id,{isFavorite:true});
    }else if(action==='blacklisted'){
        changee(channel.id,{isFavorite:true});
    }else{
        deletee(channel.id);
        channels=channels.filter((p)=>p.id!==channel.id);
    }
    affichage(liste(channels));
}else  if(cart){
const carts=document.querySelectorAll("[data-id]");
carts.forEach((c)=>selectio(c));
selectionn(cart);
const element=channels.find(({id})=> id===cart.dataset.id)
affichagePrevi(element)
}
})


