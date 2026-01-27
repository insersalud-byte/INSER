import React from 'react';
import clsx from 'clsx';
import css from './Input.module.css';

const Input = ({
    label,
    error,
    className,
    id,
    type = 'text',
    ...props
}) => {
    return (
        <div className={clsx(css.wrapper, className)}>
            {label && <label htmlFor={id} className={css.label}>{label}</label>}
            <input
                id={id}
                type={type}
                className={clsx(css.input, error && css.errorInput)}
                {...props}
            />
            {error && <span className={css.errorText}>{error}</span>}
        </div>
    );
};

export default Input;
