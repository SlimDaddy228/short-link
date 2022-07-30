import React, { useContext, useMemo, useState } from 'react';
import { observer } from "mobx-react";
import { Context } from "../index";
import { generateLink } from "../http/linksAPI";
import { generateLinkId } from "../utils/utils";
import { APPLICATION_ROUTES } from '../consts/routes';
import InputForm, { FormInputData } from "../components/InputForm";

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

        const isApplicationLink = `/${link.value}`.indexOf(APPLICATION_ROUTES) !== -1;
        if (isApplicationLink) return alert('Такую ссылку нельзя создать');

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

        const isClipboard = ('clipboard' in navigator)

        isClipboard ? await navigator.clipboard.writeText(result) : document.execCommand('copy', true, result)
    }

    const onSubmit = (e: React.SyntheticEvent) => result ? copyLink(e) : createLink(e);

    const title: string = useMemo(() => 'Create short link', [])
    const buttonLabel: string = useMemo(() => result ? "Copy" : "Generate", [result])
    const formData = useMemo((): Array<FormInputData> => [
        {
            id: 'redirectLink',
            label: 'Your Link',
            placeholder: 'www.example.com/qwertyQWERTY',
            type: 'url',
        },
        {
            id: 'link',
            label: 'Alias (Optional)',
            placeholder: `${user.isAuth ? "rules" : "Register for used this"}`,
            disabled: !user.isAuth
        },
        {
            id: 'resultLink',
            label: 'Result',
            placeholder: 'Created link',
            disabled: !result,
            value: result
        },
    ], [user.isAuth, result])

    return (
        <div
            className={'flex justify-center items-center'}
            style={{ height: window.innerHeight - 120 }} // 120 - height navbar
        >
            <InputForm
                title={title}
                buttonLabel={buttonLabel}
                formData={formData}
                onSubmit={onSubmit}
            />
        </div>
    );
});

export default CreateLink;