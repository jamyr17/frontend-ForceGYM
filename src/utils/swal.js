import Swal from 'sweetalert2';

export async function createSwal({
    title = '', 
    text = '', 
    icon = '', 
    showCancelButton = false, 
    cancelButtonText = 'Cancel', 
    showConfirmButton = true, 
    confirmButtonText = 'OK', 
    timer = null 
}){
    return await Swal.fire({
        title: title,
        text: text,
        icon: icon, 
        showCancelButton: showCancelButton,
        cancelButtonText: cancelButtonText,
        showConfirmButton: showConfirmButton, 
        confirmButtonText: confirmButtonText,
        timer: timer
    });
}