import React from "react";

interface DropDownComponentProps {
    title: string;
    value : any;
    setValue: (value: any) => void;
    options: any[];
    optionLabel: string;
}

export const DropDownComponent: React.FC<DropDownComponentProps> = ({title, value, setValue, options, optionLabel }) => {

    return (

        <div className="form-group">
        <span>{title}</span>
        <select className="form-field" value={value !== undefined ? value : ''} onChange={e => setValue(e.target.value as string)}>
            <option value="">---</option>
            {options.map((option, index) => (
                <option key={index} value={option[optionLabel]}>{option[optionLabel]}</option>
            ))}
        </select>
    </div>
    )
}
