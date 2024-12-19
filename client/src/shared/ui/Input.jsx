// eslint-disable-next-line react/prop-types
export default function Input({ type, id, name, autoComplete, value, onChange }) {
    return (
        <label>
            <input
                type={type}
                id={id}
                name={name}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                required
            ></input>
        </label>
    )
}