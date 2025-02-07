export default function ApiErrorMsg(props) {
    return (
        <>
            <div
                className="modal fade show"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                style={{ display: 'block' }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="exampleModalLabel">Erro {props.status}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {document.getElementById('exampleModal').style.display = 'none'; document.querySelector('.modal-backdrop').remove();}}></button>
                        </div>
                        <div className="modal-body fs-6">
                            Alguns recursos podem estar temporariamente indisponíveis.
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  onClick={() => {document.getElementById('exampleModal').style.display = 'none'; document.querySelector('.modal-backdrop').remove();}}> Fechar </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay do modal (backdrop) */}
            <div className="modal-backdrop fade show"></div></>
    )
}