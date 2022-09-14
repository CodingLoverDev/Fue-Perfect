import { ReactNode, useEffect, useState } from 'react';

import { format } from 'date-fns';
import merge from 'merge-images';
import nl from 'date-fns/locale/nl';
import { Countries, Gender, HairState, HairType } from './data';
import styles from './content.module.scss';

export default function Content(state: HairState) {
    const [zone64, setZone64] = useState('');
    const [logo, setLogo] = useState('');

    useEffect(() => {
        import('!url-loader!./assets/logo.png').then(({ default: img }) => setLogo(img));
    }, []);

    // Head images w/ zones
    useEffect(() => {
        import('./zones').then(({ head, zones }) => {
            const headImages = [head, ...zones[0].filter((_v, i) => state.zones[0][i]), ...zones[1].filter((_v, i) => state.zones[1][i])];
            merge(headImages).then(setZone64);
        });
    }, [state.zones]);

    return (
        <div className={styles.message} style={{ fontFamily: 'Sans-Serif' }}>
            <p>
                Geachte {state.gender === Gender.MALE ? 'heer' : 'mevrouw'} {state.firstname} {state.lastname},
            </p>
            {state.inspection ? (
                <>
                    <p>
                        Bedankt voor de interesse die u getoond heeft in onze organisatie, wij hebben uw aanvraag + foto&apos;s in goede
                        orde ontvangen.
                    </p>
                    <p>
                        Uw foto&apos;s / toelichting zijn beoordeeld en hieronder vindt u de analyse terug m.b.t uw Haartransplantatie
                        behandeling, u bent altijd van harte welkom voor een vrijblijvend consult naar onze kliniek te Hoofddorp!
                    </p>
                    <p>
                        * Aangezien de beoordeling d.m.v. foto&apos;s is vastgesteld, bestaat een kleine kans van afwijking na de
                        definitieve onderzoek in onze kliniek.
                    </p>
                </>
            ) : (
                <>
                    {' '}
                    <p>
                        Bedankt voor de interesse die u getoond heeft in onze organisatie, u heeft op{' '}
                        <strong>{format(state.date, 'PPP', { locale: nl })}</strong> een vooronderzoek ondergaan omtrent uw FUE
                        Haartransplantatie behandeling.
                    </p>
                    <p>Hieronder vindt u de analyse en de samenvatting terug wat wij hebben gesproken.</p>
                </>
            )}

            <p>
                <strong>Rapport medisch team:</strong>
            </p>
            <p>
                <strong>Behandeling</strong>: FUE Haartransplantatie behandeling
                <br />
                <strong>Kwaliteit/ Volume donor</strong>:{' '}
                {(Object.keys(HairType) as Array<keyof typeof HairType>)
                    .map<ReactNode>(v => (
                        <span key={v} style={state.hair.volume[v] ? { color: 'orange', textDecoration: 'underline' } : {}}>
                            {v}
                        </span>
                    ))
                    .reduce((prev, curr, i) => [prev, <span key={i}> - </span>, curr])}
                <br />
                <strong>Kwaliteit/ Type haar</strong>:{' '}
                {(Object.keys(HairType) as Array<keyof typeof HairType>)
                    .map<ReactNode>(v => (
                        <span key={v} style={state.hair.type[v] ? { color: 'orange', textDecoration: 'underline' } : {}}>
                            {v}
                        </span>
                    ))
                    .reduce((prev, curr, i) => [prev, <span key={i}> - </span>, curr])}
                <br />
                <strong>Aantal grafts eerste sessie</strong>: {state.grafts[0]} grafts
                <br />
                {state.sessions === 2 && (
                    <>
                        <strong>Aantal grafts tweede sessie</strong>: {state.grafts[1]} grafts (niet verplicht)
                        <br />
                    </>
                )}
                <strong>Techniek</strong>: {state.technique}
                <br />
                <strong>Zone</strong>: 1e sessie zone:{' '}
                {state.zones[0]
                    .map((_v, i) => i + 1)
                    .filter((_v, i) => state.zones[0][i])
                    .join(', ')}{' '}
                (zie schema onder)
                {state.sessions === 2 &&
                    `/ 2e sessie zone: ${state.zones[1]
                        .map((_v, i) => i + 1)
                        .filter((_v, i) => state.zones[1][i])
                        .join(', ')} (zie schema onder)`}
                <br />
                <strong>Duur behandeling 1e sessie</strong>: 6-7 uur
                <br />
                {state.sessions === 2 && (
                    <>
                        <strong>Duur behandeling 2e sessie</strong>: 5-6 uur
                        <br />
                    </>
                )}
                <strong>Sessie</strong>: {state.sessions} sessie behandeling
                <br />
                <strong>Verdoving</strong>: Pijnloos lokaal verdoving
                <br />
                <strong>Behandeling bestemming</strong>: {state.country}
                <br />
                <strong>Behandeling data</strong>: {state.notes || '-'}
                <br />
                <strong>Extra Opmerking</strong>: {state.opmerkingNotes || '-'}
                <br />
            </p>
            <img src={zone64} alt='Zones' style={{ maxHeight: '300px' }} />
            {state.country !== Countries.TURKEY && (
                <>
                    <p>
                        <strong style={{ color: '#c82613' }}>
                            Kosten behandeling {state.sessions} sessie
                            {state.sessions === 1 ? '' : 's'} in Nederland All-in €{state.price[0][0] + state.price[0][1]}{' '}
                            {!!state.discount && `(€${Math.abs(state.discount)} korting)`}
                        </strong>
                        {state.sessions === 2 && (
                            <>
                                <br />
                                <strong style={{ textDecoration: 'underline' }}>
                                    Eerste sessie: €{state.price[0][0]} {!!state.discount && `(€${Math.abs(state.discount)} korting)`}
                                </strong>
                                <br />
                                <span style={{ textDecoration: 'underline' }}>
                                    <strong>Tweede sessie: €{state.price[0][1]} </strong>(na min 12 maanden genezingstijd, niet verplicht)
                                </span>
                            </>
                        )}
                    </p>
                    <p>
                        <strong>Inhoud All-in pakket Nederland:</strong>
                    </p>
                    <ul style={{ marginLeft: '32px' }}>
                        <li>Vooronderzoek</li>
                        <li>FUE-haartransplantatie behandeling</li>
                        <li>Shampoo, lotion en medicatie</li>
                        <li>1x prp behandeling in NL</li>
                        <li>4x Nacontrole gedurende 10 maanden</li>
                    </ul>
                </>
            )}
            {state.country !== Countries.NETHERLANDS && (
                <>
                    <p>
                        <strong style={{ color: '#c82613' }}>
                            Kosten behandeling {state.sessions} sessie
                            {state.sessions === 1 ? '' : 's'} in Turkije All-in €{state.price[1][0] + state.price[1][1]}{' '}
                            {!!state.discount && `(€${Math.abs(state.discount)} korting)`}
                        </strong>
                        {state.sessions === 2 && (
                            <>
                                <br />
                                <strong style={{ textDecoration: 'underline' }}>
                                    Eerste sessie: €{state.price[1][0]} {!!state.discount && `(€${Math.abs(state.discount)} korting)`}
                                </strong>
                                <br />
                                <span style={{ textDecoration: 'underline' }}>
                                    <strong>Tweede sessie: €{state.price[1][1]} </strong>(na min 12 maanden genezingstijd, niet verplicht)
                                </span>
                            </>
                        )}
                    </p>
                    <p>
                        <strong>Inhoud All-in pakket Turkije/Istanbul:</strong>
                    </p>
                    <ul style={{ marginLeft: '32px' }}>
                        <li>Vooronderzoek</li>
                        <li>Retour vliegticket met KLM of Turkish Airlines</li>
                        <li>3 overnachtingen in Hilton Doubbletree Istanbul</li>
                        <li>FUE-haartransplantatie behandeling</li>
                        <li>Shampoo, lotion en medicatie</li>
                        <li>1x prp behandeling in NL</li>
                        <li>4x Nacontrole gedurende 10 maanden</li>
                    </ul>
                </>
            )}
            <p>
                Wij hopen u hiermee voldoende te hebben geïnformeerd en kijken uit naar uw bevindingen, mocht u vragen of opmerkingen hebben
                dan horen wij deze graag van u.
            </p>
            <p>Met vriendelijke groeten,</p>
            <p style={{ color: 'grey' }}>
                <strong>A.Senturk</strong>
            </p>
            <img src={logo} alt='Fue Perfect' style={{ height: '100px' }} />
            <p>
                <i>
                    <strong style={{ color: 'orange' }}>
                        Hoofdweg 848A, 2132 MC, Hoofddorp
                        <br />
                        020-261 32 00 Nederland
                        <br />
                        038-081 20 4 België
                        <br />
                        06-15 03 87 65 Mobiel <br />
                    </strong>
                    <strong style={{ color: 'cornflowerblue' }}>
                        <a href='mailto:arkin@fueperfect.com'>arkin@fueperfect.com</a>
                        <br />
                        <a href='www.fueperfect.com'>www.fueperfect.com</a>
                    </strong>
                </i>
            </p>
        </div>
    );
}
