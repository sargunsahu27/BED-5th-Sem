const principal = require("./principal");


function suspendStudent(name) {
// let principal=new principal("Kavya");
let principal=principal.getprincipal();
principal.suspend(name);

}
function removeSuspension(name) {
    // let principal=new principal("sargun");
let principal=principal.getprincipal();
    principal.removesunpension(name);
    
    }