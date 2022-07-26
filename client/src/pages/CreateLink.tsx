import React, { useContext, useState } from 'react';
import { observer } from "mobx-react";
import { Context } from "../index";
import { generateLink } from "../http/linksAPI";
import { generateLinkId } from "../utils/utils";

const CreateLink = observer(() => {
    const { user } = useContext(Context)
    const [result, setResult] = useState<string>('')

    const createLink = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            redirectLink: { value: string };
            link: { value: string };
        };

        const { link, redirectLink } = target

        if (!redirectLink.value) return alert('Введите основную ссылку');

        try {
            const result = await generateLink(link.value || generateLinkId(5), redirectLink.value)
            const buildLink = `${window.location.host}/${result.link}`
            setResult(buildLink)
        } catch (e: any) {
            alert(e.response.data.message)
        }
    }

    const copyLink = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(result);
        }
        else {
            return document.execCommand('copy', true, result);
        }
    }

    return (
        <div
            className={'flex justify-center items-center'}
            style={{ height: window.innerHeight - 120 }} // 120 - height navbar
        >
            <div className='flex'>
                <div className='w-96 m-auto bg-gray-50 rounded-lg border border-gray-400 shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        {`Create short link`}
                    </h1>
                    <form onSubmit={result ? copyLink : createLink}>
                        <div>
                            <label htmlFor='Your link'>{`Your Link`}</label>
                            <input
                                type='url'
                                id='redirectLink'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='www.example.com/qwertyQWERTY'
                            />
                        </div>

                        <div>
                            <label htmlFor='Short Link Name'>{`Alias (Optional)`}</label>
                            <input
                                type='text'
                                id='link'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder={`${user.isAuth ? "rules" : "Register for used this"}`}
                                disabled={!user.isAuth}
                            />
                        </div>

                        <div>
                            <label htmlFor='resultLink'>{`Result`}</label>
                            <input
                                type='url'
                                id='resultLink'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder={`Created link`}
                                value={result}
                                disabled={!result}
                            />
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button
                                className={`bg-green-800 py-2 px-4 text-sm text-white rounded focus:outline-none`}
                            >
                                {result ? "Copy" : "Generate"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default CreateLink;