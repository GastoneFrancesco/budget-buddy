import React from "react";

interface InputTextComponentProps {
    title: string;
    value : any;
    onChange: (value: any) => void;
}

export const InputTextComponent: React.FC<InputTextComponentProps> = ({title, value, onChange }) => {

    return (

        <div className="form-group">
            <span>{title}</span>
            <input className="form-field" type="text"
                value={value !== undefined ? value : ''}
                onChange={e => onChange(e.target.value)} />
        </div>

    )
}
