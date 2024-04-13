import React from "react";

interface DateComponentProps {
    title: string;
    date: Date;
    setDate: (value: Date) => void;
}

export const DateComponent: React.FC<DateComponentProps> = ({ title, date, setDate }) => {

    return (

        <div className="form-group">
            <span>{title}</span>
            <input className="form-field" type="date"
                value={date.toISOString().split('T')[0]}
                onChange={e => setDate(new Date(e.target.value))} />
        </div>
    )
}
