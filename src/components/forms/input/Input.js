

export default function Input(props) {
    return (
        <div className='mb-3'>
            <label for={props.id} className="form-label">{props.label}</label>
            <input type={props.type} name={props.name} id={props.id} className={`form-control ${props.className}`} value={props.value} placeholder={props.placeholder} required={props.required} min={props.min} max={props.max} onChange={props.onChange}/>
        </div>
    )
}