import { formatDate } from "../shared/utils/format";
import useClientStore from "./Store";

function DataInfo() {
    const { clients, activeEditingId } = useClientStore()
    if (!activeEditingId) return <></>;

    const client = clients.find(client => client.idClient === activeEditingId)
    if (!client) return <></>

    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-yellow font-black text-2xl uppercase mb-8 underline">Persona</h1>

                <div className="flex flex-col gap-2 text-lg">
                    <p><strong>CÉDULA</strong></p>
                    <p>{client.person.identificationNumber}</p>
                </div>

                <div className="flex flex-col gap-2 text-lg">
                    <p><strong>NOMBRE</strong></p>
                    <p>{
                        client.person.name + ' ' + 
                        client.person.firstLastName + ' ' + 
                        client.person.secondLastName
                    }</p>
                </div>

                <div className="flex flex-col gap-2 text-lg">
                    <p><strong>FECHA DE NACIMIENTO</strong></p>
                    <p>{formatDate(new Date(client.person.birthday))}</p>
                </div>
                
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-yellow font-black text-2xl uppercase mb-8 underline">Contacto</h1>

                <div className="flex flex-col gap-2 text-lg">
                    <p><strong>TELÉFONO</strong></p>
                    <p>{client.person.phoneNumber}</p>
                </div>

                <div className="flex flex-col gap-2 text-lg">
                    <p><strong>EMERGENCIA</strong></p>
                    <p>{client.emergencyContact}</p>
                </div>

                <div className="flex flex-col gap-2 text-lg">
                    <p><strong>EMAIL</strong></p>
                    <p>{client.person.email}</p>
                </div>
                
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-yellow font-black text-2xl uppercase mb-8 underline">SALUD</h1>

            </div>
        </div>
    );
}

export default DataInfo;
