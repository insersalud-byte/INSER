import React from 'react';
import clsx from 'clsx';
import css from './Button.module.css';

/**
 * Premium Button Component
 * variants: primary, secondary, outline, ghost, danger
 * sizes: sm, md, lg
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    loading,
    disabled,
    ...props
}) => {
    return (
        <button
            className={clsx(
                css.btn,
                css[variant],
                css[size],
                loading && css.loading,
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? <span className={css.spinner} /> : children}
        </button>
    );
};

export default Button;
