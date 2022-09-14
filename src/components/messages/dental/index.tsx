import { useState } from 'react';
import { CredentialsProps } from '../../Credentials';
import Layout from '../../Layout';
import content from './content';
import { defaultState } from './data';
import form from './form';

export default function Dental(props: CredentialsProps) {
    const [state, setState] = useState(defaultState);

    const fullname = `${state.firstname} ${state.lastname}`;
    const subject = `Incomplete Subject: ${fullname}`;

    return <Layout credentials={props} subject={subject} content={content(state)} form={form({ state, setState })} />;
}
