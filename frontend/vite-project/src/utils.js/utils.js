export function formatDate (date){
return date.toLocaleDateString("es-US",{
month:"short",
day:"numeric",
year:"numeric",

})


}