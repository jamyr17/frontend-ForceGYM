import Swal from 'sweetalert2';
import { postData, putData, deleteData } from '../hooks/useApi'; 
import { createSwal } from './swal';

export const handleSubmit = async ({
    object,
    modalData,
    isEditMode,
    urlAdd,
    urlUpdate,
    refetchFn,
    resetFn,
    setShowModal
}) => {

    try {
        let response;
        let answer;

        if (isEditMode) {
            answer = await createSwal(
            {
                title: '¿Quieres actualizar este ' + object + '?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, confirmar',
                cancelButtonText: 'Cancelar'
            });

            if (answer.isConfirmed) {
                response = await putData(urlUpdate, modalData);
            }

        }else{
            response = await postData(urlAdd, modalData);
        }

        if (answer.isConfirmed) {
            if (!response ) {
                createSwal({title: '¡Ocurrió un error!', text: "No se pudo procesar la solicitud.", icon: 'error'});
            } else {
                refetchFn();
                createSwal({title: isEditMode ? '¡Se ha actualizado el ' + object + '!' : '¡Se ha registrado el ' + object + '!', text: response, icon: 'success'});
                resetFn(); 
                setShowModal(false); 
            }
        }
        
    } catch (error) {
        Swal.fire('¡Ocurrió un error!', "No se pudo procesar la solicitud.", 'error');
        console.error("Error saving data:", error);
    }

};

export const handleDelete = async ({
    id,
    object, 
    urlDelete,
    refetchFn,
    loggedUserId = 1, 
}) => {
    const answer = await createSwal(
    {
        title: '¿Estás seguro?',
        text: 'No podrás deshacer esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
     });

    if (answer.isConfirmed) {
        try {
            const response = await deleteData(`${urlDelete}/${id}`, {
                data: { paramLoggedIdUser: loggedUserId }
            });

            if (!response) {
                createSwal({title: '¡Ocurrió un error!', text: "No se pudo procesar la solicitud.", icon: 'error'});
            } else {
                refetchFn();
                createSwal({title: '¡Se ha eliminado el ' + object + '!', text: response, icon: 'success'});
            }

        } catch (error) {
            createSwal({title: '¡Ocurrió un error!', text: "No se pudo procesar la solicitud.", icon: 'error'});
            console.error("Error deleting:", error);
        }
    }
};
