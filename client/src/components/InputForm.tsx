import React from 'react';

export interface FormInputData {
    id: string,
    label: string,
    placeholder?: string,
    type?: string,
    value?: string,
    disabled?: boolean,
}

interface Props {
    title: string,
    buttonLabel: string,
    formData: Array<FormInputData>,
    onSubmit: (e: React.SyntheticEvent) => void
}

const InputForm = ({ title, buttonLabel, formData, onSubmit }: Props) => {
    return (
        <div className='flex'>
            <div className='w-96 m-auto rounded-lg border border-gray-400 shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium mt-4 mb-12 text-center'>
                    {title}
                </h1>
                <form onSubmit={onSubmit}>
                    {formData.map((item) => {
                        const {id, label, type, placeholder, disabled, value} = item
                        return (
                            <div key={id}>
                                <label htmlFor={id}>{label}</label>
                                <input
                                    type={type}
                                    id={id}
                                    className={`w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    value={value}
                                />
                            </div>
                        )
                    })}
                    <div className='flex justify-center items-center mt-6'>
                        <button className={`bg-green-800 py-2 px-4 text-sm text-white rounded focus:outline-none`}>
                            {buttonLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InputForm;