import { useState, ChangeEvent, FormEvent } from 'react';

interface UseFormReturn<T> {
    values: T;
    errors: Record<string, string>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent, callback: () => void) => void;
}

export default function useForm<T extends Record<string, string>>(
    initialValues: T,
    validator: (values: T) => Record<string, string>
): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent, callback: () => void) => {
        e.preventDefault();
        const validationErrors = validator(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            callback();
        }
    };

    return { values, errors, handleChange, handleSubmit };
}
