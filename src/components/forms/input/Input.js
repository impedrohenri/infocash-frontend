

export default function Input(props) {
    return (
        <div className="mb-3">
            <label for={props.id} className="form-label">{props.label}</label>
            <input type={props.type} className="form-control" id={props.id} placeholder={props.placeholder} required={props.required}/>
        </div>
    )
}