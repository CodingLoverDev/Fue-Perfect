import 'react-datepicker/dist/react-datepicker.css';

import {
    Box,
    Checkbox,
    FormLabel,
    Input,
    InputGroup,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Radio,
    RadioGroup,
    Select,
    SimpleGrid,
    Textarea,
    VStack
} from '@chakra-ui/react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { Dispatch, SetStateAction, useEffect } from 'react';

import nl from 'date-fns/locale/nl';
import { Countries, Discounts, Gender, Grafts, HairState, HairType, Prices, Techniques } from './data';
import styles from './form.module.scss';

registerLocale('nl', nl);
setDefaultLocale('nl');

export default function Form({ state, setState }: { state: HairState; setState: Dispatch<SetStateAction<HairState>> }) {
    // Pricing
    useEffect(() => {
        // Row = Country, Col = Session
        const price = [
            [0, 0],
            [0, 0]
        ];
        price[0][0] = state.priceOverride[0][0] || Prices[Countries.NETHERLANDS][Grafts.first.findIndex(g => g === state.grafts[0])];
        price[0][0] += state.discount;

        if (state.sessions === 2)
            price[0][1] = state.priceOverride[0][1] || Prices[Countries.NETHERLANDS][Grafts.first.findIndex(g => g === state.grafts[1])];

        price[1][0] = state.priceOverride[1][0] || Prices[Countries.TURKEY][Grafts.first.findIndex(g => g === state.grafts[0])];
        price[1][0] += state.discount;

        if (state.sessions === 2)
            price[1][1] = state.priceOverride[1][1] || Prices[Countries.TURKEY][Grafts.first.findIndex(g => g === state.grafts[1])];

        setState({ ...state, price });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.priceOverride, state.sessions, state.grafts.toString(), state.country, state.discount]);

    return (
        <SimpleGrid columns={[1, null, 2, 3, 4]} spacing={4}>
            <Box>
                <FormLabel>Voornaam Klant</FormLabel>
                <InputGroup>
                    <Input placeholder='John' value={state.firstname} onChange={e => setState({ ...state, firstname: e.target.value })} />
                </InputGroup>
            </Box>
            <Box>
                <FormLabel>Achternaam Klant</FormLabel>
                <InputGroup>
                    <Input placeholder='Smith' value={state.lastname} onChange={e => setState({ ...state, lastname: e.target.value })} />
                </InputGroup>
            </Box>
            <Box>
                <FormLabel>Geslacht</FormLabel>
                <RadioGroup value={state.gender} onChange={gender => setState({ ...state, gender })}>
                    <VStack align='left'>
                        {Object.values(Gender).map(c => (
                            <Radio key={c} value={c}>
                                {c}
                            </Radio>
                        ))}
                    </VStack>
                </RadioGroup>
            </Box>
            <Box>
                <FormLabel>Haarinspectie</FormLabel>
                <Checkbox
                    isChecked={state.inspection}
                    onChange={e => {
                        setState({ ...state, inspection: e.target.checked });
                    }}
                >
                    Haarinspectie
                </Checkbox>
            </Box>
            <Box>
                <FormLabel>Datum</FormLabel>
                <InputGroup className={styles.datepicker}>
                    <DatePicker
                        selected={new Date(state.date)}
                        onChange={e =>
                            setState({
                                ...state,
                                date: e instanceof Date ? e.getTime() : Date.now()
                            })
                        }
                        dateFormat='PPP'
                    />
                </InputGroup>
            </Box>
            <Box>
                <FormLabel>Techniek</FormLabel>
                <Select
                    value={state.technique}
                    onChange={e => {
                        setState({ ...state, technique: e.target.value });
                    }}
                >
                    {Techniques.map(v => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box>
                <FormLabel>Klant Land</FormLabel>
                <RadioGroup value={state.country} onChange={country => setState({ ...state, country })}>
                    <VStack align='left'>
                        {Object.values(Countries).map(c => (
                            <Radio key={c} value={c}>
                                {c}
                            </Radio>
                        ))}
                    </VStack>
                </RadioGroup>
            </Box>
            <Box>
                <FormLabel>Type Haar</FormLabel>
                <VStack align='left'>
                    {(Object.keys(HairType) as Array<keyof typeof HairType>).map(v => (
                        <Checkbox
                            isChecked={state.hair.type[v]}
                            key={v}
                            onChange={() => {
                                const type = { ...state.hair.type };
                                type[v] = !type[v];
                                setState({ ...state, hair: { ...state.hair, type } });
                            }}
                        >
                            {v}
                        </Checkbox>
                    ))}
                </VStack>
            </Box>
            <Box>
                <FormLabel>Volume Donor</FormLabel>
                <VStack align='left'>
                    {(Object.keys(HairType) as Array<keyof typeof HairType>).map(v => (
                        <Checkbox
                            isChecked={state.hair.volume[v]}
                            key={v}
                            onChange={() => {
                                const volume = { ...state.hair.volume };
                                volume[v] = !volume[v];
                                setState({ ...state, hair: { ...state.hair, volume } });
                            }}
                        >
                            {v}
                        </Checkbox>
                    ))}
                </VStack>
            </Box>
            <Box>
                <FormLabel>Sessies</FormLabel>
                <RadioGroup value={state.sessions} onChange={s => setState({ ...state, sessions: Number(s) as typeof state.sessions })}>
                    <VStack align='left'>
                        <Radio value={1}>1 sessie</Radio>
                        <Radio value={2}>2 sessie</Radio>
                    </VStack>
                </RadioGroup>
            </Box>
            <Box>
                <FormLabel>Sessie 1: Grafts</FormLabel>
                <Select
                    value={state.grafts[0]}
                    onChange={e => {
                        const updated = { ...state, grafts: [...state.grafts] };
                        updated.grafts[0] = e.target.value;
                        setState(updated);
                    }}
                >
                    {Grafts.first.map(v => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </Select>
                {state.country !== Countries.TURKEY && (
                    <>
                        <FormLabel mt={2}>Prijsoverschrijving: Nederland</FormLabel>
                        <NumberInput
                            min={0}
                            step={50}
                            onChange={(_, v) =>
                                setState({
                                    ...state,
                                    priceOverride: [[v, state.priceOverride[0][1]], state.priceOverride[1]]
                                })
                            }
                            precision={0}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </>
                )}
                {state.country !== Countries.NETHERLANDS && (
                    <>
                        <FormLabel mt={2}>Prijsoverschrijving: Turkije</FormLabel>
                        <NumberInput
                            min={0}
                            step={50}
                            onChange={(_, v) =>
                                setState({
                                    ...state,
                                    priceOverride: [state.priceOverride[0], [v, state.priceOverride[1][1]]]
                                })
                            }
                            precision={0}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </>
                )}
            </Box>
            <Box>
                <FormLabel>Sessie 1: Zones</FormLabel>
                <VStack align='left'>
                    {Array(6)
                        .fill(0)
                        .map((_v, i) => (
                            <Checkbox
                                isChecked={state.zones[0][i]}
                                key={i}
                                onChange={() => {
                                    const updated = {
                                        ...state,
                                        zones: [[...state.zones[0]], state.zones[1]]
                                    };
                                    updated.zones[0][i] = !updated.zones[0][i];
                                    setState(updated);
                                }}
                            >
                                Zone {i + 1}
                            </Checkbox>
                        ))}
                </VStack>
            </Box>
            <Box display={state.sessions === 2 ? 'block' : 'none'}>
                <FormLabel>Sessie 2: Grafts</FormLabel>
                <Select
                    value={state.grafts[1]}
                    onChange={e => {
                        const updated = { ...state, grafts: [...state.grafts] };
                        updated.grafts[1] = e.target.value;
                        setState(updated);
                    }}
                >
                    {Grafts.second.map(v => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </Select>
                {state.country !== Countries.TURKEY && (
                    <>
                        <FormLabel mt={2}>Prijsoverschrijving: Nederland</FormLabel>
                        <NumberInput
                            min={0}
                            step={50}
                            onChange={(_, v) =>
                                setState({
                                    ...state,
                                    priceOverride: [[state.priceOverride[0][0], v], state.priceOverride[1]]
                                })
                            }
                            precision={0}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </>
                )}
                {state.country !== Countries.NETHERLANDS && (
                    <>
                        <FormLabel mt={2}>Prijsoverschrijving: Turkije</FormLabel>
                        <NumberInput
                            min={0}
                            step={50}
                            onChange={(_, v) =>
                                setState({
                                    ...state,
                                    priceOverride: [state.priceOverride[0], [state.priceOverride[1][0], v]]
                                })
                            }
                            precision={0}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </>
                )}
            </Box>

            <Box display={state.sessions === 2 ? 'block' : 'none'}>
                <FormLabel>Sessie 2: Zones</FormLabel>
                <VStack align='left'>
                    {Array(6)
                        .fill(0)
                        .map((_v, i) => (
                            <Checkbox
                                isChecked={state.zones[1][i]}
                                key={i}
                                onChange={() => {
                                    const updated = {
                                        ...state,
                                        zones: [state.zones[0], ...[state.zones[1]]]
                                    };
                                    updated.zones[1][i] = !updated.zones[1][i];
                                    setState(updated);
                                }}
                            >
                                Zone {i + 1}
                            </Checkbox>
                        ))}
                </VStack>
            </Box>
            <Box>
                <FormLabel>Korting</FormLabel>
                <RadioGroup value={state.discount} onChange={d => setState({ ...state, discount: Number(d) as typeof state.discount })}>
                    <VStack align='left'>
                        {Discounts.map(v => (
                            <Radio key={v} value={v}>
                                {v < 0 && '-'}€{Math.abs(v)}
                            </Radio>
                        ))}
                    </VStack>
                </RadioGroup>
            </Box>
            <Box>
                <FormLabel>Behandeling data</FormLabel>
                <InputGroup>
                    <Textarea placeholder='-' value={state.notes} onChange={e => setState({ ...state, notes: e.target.value })} />
                </InputGroup>
            </Box>
            <Box>
                <FormLabel>Extra Opmerking</FormLabel>
                <InputGroup>
                    <Textarea
                        placeholder='-'
                        value={state.opmerkingNotes}
                        onChange={e => setState({ ...state, opmerkingNotes: e.target.value })}
                    />
                </InputGroup>
            </Box>
        </SimpleGrid>
    );
}
