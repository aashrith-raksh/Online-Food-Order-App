export default function Input({id, label, ...props}){
    return <p className="control">
        <label htmlFor={id}>{label}</label>
        <input required id={id} name={id} {...props}/>
    </p>
}