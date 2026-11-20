import { getData, changee,deletee,poste } from "../services/api.js";
import { affichage } from "../ui/afichage.js";
import { affichagePrevi  ,selectionn,selectio } from "../ui/afichage.js";
import { selecte } from "../ui/afichage.js";
import { loading } from "../ui/afichage.js";
import { errour } from "../ui/afichage.js";

const list= document.getElementById("channel");
const search=document.getElementById("search");
const select=document.getElementById("select");
const blac=document.getElementById("blac");
const favori=document.getElementById("favori");
const btnadd=document.getElementById("btn-add")
const btnremov=document.getElementById("btn-cancel")
const btnsave=document.getElementById("btn-save")
const fNumber=document.getElementById("f-number")
const fName=document.getElementById("f-name")
const fCategory=document.getElementById("f-category")
const fLogo=document.getElementById("f-logo")
const fImage=document.getElementById("f-image")
const formError=document.getElementById("form-error")
const formSuccess=document.getElementById("form-success")
const btntout=document.getElementById("btn-tout")
const modal = document.getElementById("modal")

export let channels=[];
let ruslt=[];
function liste(data){
    return ruslt=data.filter((p)=> p.isBlacklisted===false);
}
async function demarage() {
    loading(false);
    errour(true);
    try {
        channels = await getData();
        const visible = liste(channels);
        affichage(visible);
        selecte(channels);

        if (visible.length > 0) {
            affichagePrevi(visible[0]);
            const firstChannel = list.querySelector(`[data-id="${visible[0].id}"]`);
            if (firstChannel) selectionn(firstChannel);
        }
    } catch (error) {
        console.error(error);
        errour(false, error.message);
    } finally {
        loading(true);
    }
}
demarage();

let currentView = () => liste(channels);

select.addEventListener("change", () => {
    if (select.value !== "") {
        currentView = () => liste(channels.filter(p => p.category === select.value));
    } else {
        currentView = () => liste(channels);
    }
    affichage(currentView());
    search.value = "";
});
btntout.addEventListener("click",()=>{
    currentView = () => liste(channels);
    affichage(currentView());
})
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
        changee(channel.id,{isFavorite:!channel.isFavorite});
        channel.isFavorite=!channel.isFavorite;
    }else if(action==='blacklisted'){
        changee(channel.id,{isBlacklisted:!channel.isBlacklisted});
        channel.isBlacklisted=!channel.isBlacklisted;
    }else{
        if(channel.isBlacklisted){
            if(confirm("Supprimer cette chaine ?")){
                deletee(channel.id);
                channels=channels.filter((p)=>p.id!==channel.id);
            }
        }else {
            btnsave.textContent="Modifier";
            modifier(channel)
        }
    }
    // demarage();
    affichage(currentView());
}else  if(cart){
    const carts=document.querySelectorAll("[data-id]");
carts.forEach((c)=>selectio(c));
selectionn(cart);
const element=channels.find(({id})=> id===cart.dataset.id)
affichagePrevi(element)
}
})


blac.addEventListener("click",()=>{
    currentView = () => channels.filter(p => p.isBlacklisted === true);
    affichage(currentView());
})
favori.addEventListener("click",()=>{
    currentView = () => liste(channels.filter(p => p.isFavorite === true));
    affichage(currentView());
})


btnadd.addEventListener("click", () => {
    btnsave.textContent="Ajouter"
    modal.classList.remove("hidden");
});

btnremov.addEventListener("click", closeModal);

function closeModal() {
    modal.classList.add("hidden");
    fNumber.value = "";
    fName.value = "";
    fCategory.value = "";
    fLogo.value = "";
    fImage.value = "";
    formError.classList.add("hidden");
    formSuccess.classList.add("hidden");
    valide=0;
}
let valide=0;
function modifier(p){
    modal.classList.remove("hidden");
    fNumber.value = p.channelNumber ;
    fName.value = p.name ;
    fCategory.value = p.category ;
    fLogo.value =p.logo;
    fImage.value = p.previewImage ;
    valide=p;
}
btnsave.addEventListener("click",()=>{
    const numbre=fNumber.value.trim();
    const name=fName.value.trim();
    if (numbre === "" || name === "") {
        formError.textContent = "Le numéro et le nom sont obligatoires";
        formError.classList.remove("hidden");
        return;
    }
    if(valide){
        valide.channelNumber=numbre,
        valide.name=name,
        valide.category=fCategory.value.trim()||"AUTRE",
        valide.logo=fLogo.value.trim()||`https://placehold.co/60x60?text=${name}`,
        valide.previewImage=fImage.value.trim()||`https://placehold.co/60x60?text=${name}`,
        changee(valide.id,valide);
        setTimeout(()=>{
        closeModal();
        btnsave.disabled=false;
        affichage(currentView());
    },1000);
    return
    }

    const chain={
        channelNumber:numbre,
        name:name,
        category:fCategory.value.trim()||"AUTRE",
        logo:fLogo.value.trim()||`https://placehold.co/60x60?text=${name}`,
        previewImage:fImage.value.trim()||`https://placehold.co/60x60?text=${name}`,
        isFavorite:false,
        isBlacklisted:false
    }
    poste(chain);
    // channels.push(chain);
    console.log(channels);
    formError.classList.add("hidden");
    formSuccess.classList.remove("hidden");
    btnsave.disabled=true;
    // setTimeout(closeModal, 1000);
    setTimeout(()=>{
        closeModal();
        btnsave.disabled=false;
        affichage(currentView());
    },1000)
})
