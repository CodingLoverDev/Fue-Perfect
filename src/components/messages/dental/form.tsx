import {
    Box,
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
    VStack
} from '@chakra-ui/react';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import { BottomToothImages, DentalState, Gender, Technic, TopToothImages } from './data';

// Import Techniek Components
import AllOnCom from './technics/AllOnCom';
import BrugCom from './technics/BrugCom';
// Import Data
import ImplantaatCom from './technics/ImplantaatCom';
import SinusliftCom from './technics/SinusliftCom';
import WortelkanaalCom from './technics/WortelkanaalCom';
// Styles
import styles from './content.module.scss';

// Chakra and React Hook

// ** Main **
export default function Form({ state, setState }: { state: DentalState; setState: Dispatch<SetStateAction<DentalState>> }) {
    // ChangeHandler Techniek in Selector
    const changeTechniken: ChangeEventHandler<HTMLSelectElement> = e => setState({ ...state, technic: e.target.value });
    // Select Componentin Selector
    const SelectTechniek = () => {
        switch (state.technic) {
            case 'Implantaat':
                return <ImplantaatCom state={state} setState={setState} />;
                break;
            case 'Brug':
                return <BrugCom state={state} setState={setState} />;
                break;
            case 'Sinuslift':
                return <SinusliftCom state={state} setState={setState} />;
                break;
            case 'All-on':
                return <AllOnCom state={state} setState={setState} />;
                break;
            case 'Wortelkanaal behandeling':
                return <WortelkanaalCom state={state} setState={setState} />;
                break;
            default:
                break;
        }
    };
    return (
        <div>
            {/* Tooth Options */}
            <SimpleGrid columns={[1, null, 2, 3, 4]} spacing={4}>
                <Box>
                    <FormLabel>Voornaam Klant</FormLabel>
                    <InputGroup>
                        <Input
                            placeholder='John'
                            value={state.firstname}
                            onChange={e => setState({ ...state, firstname: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <FormLabel>Achternaam Klant</FormLabel>
                    <InputGroup>
                        <Input
                            placeholder='Smith'
                            value={state.lastname}
                            onChange={e => setState({ ...state, lastname: e.target.value })}
                        />
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
                    <Select value={state.technic} onChange={changeTechniken}>
                        {Technic.map((v, key) => (
                            <option key={key} value={v}>
                                {v}
                            </option>
                        ))}
                    </Select>
                    <>{SelectTechniek()}</>
                </Box>
                <Box>
                    <FormLabel>Extractie</FormLabel>
                    <NumberInput min={1} max={32} step={1} precision={0}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>
            </SimpleGrid>
            {/* End Options */}

            {/* Tooth Image */}
            <Box className={styles.tooth_content}>
                <Box className={styles.slide_tooth_btn}>
                    <Box className={styles.permanent_tooth_btn}>Het blijvende gebit</Box>
                    <Box className={styles.child_tooth_btn}>Melktanden</Box>
                </Box>
                <Box className={styles.description}>
                    <Box>
                        <h1 style={{ fontWeight: 'bold' }}>Implantaat:</h1>
                        <p>A-Kwaliteit €895</p>
                        <p>Porselein €195</p>
                    </Box>
                    <Box>
                        <h1 style={{ fontWeight: 'bold' }}>Brug: </h1>
                        <p>Driedelige brug 3x material-crown</p>
                        <p>Porselein €195</p>
                    </Box>
                </Box>
                <Box className={styles.important_notes}>
                    <Box className={styles.note}>
                        <img src='/important.png' alt='Important_image' />
                        <p>Notes</p>
                    </Box>

                    <Box className={styles.implant_note}>
                        <p>Clicking teeth, you can have implant.</p>
                    </Box>
                    <Box className={styles.brug_note}>
                        <p>Clicking the number of teeth, you can have brug</p>
                    </Box>
                    <Box className={styles.understand_note}>
                        <img src='/nomsg.png' alt='No_message' />

                        <p>Do you make sense of notes?</p>
                    </Box>
                </Box>
                <Box className={styles.all_price}></Box>
                <Box className={styles.top_tooth_numbers}>
                    {state.topTooth.map((teeth, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                const TopTeeth = state.topTooth.map((item, count) =>
                                    count === index ? { ...item, clickBrug: item.clickBrug + 1 } : item
                                );
                                setState({
                                    ...state,
                                    topTooth: TopTeeth
                                });
                            }}
                            className={styles.teethTopNumber}
                            style={{
                                marginRight: teeth.marginRight,
                                backgroundColor: teeth.clickBrug % 2 === 1 ? 'red' : 'white',
                                color: teeth.clickBrug % 2 === 1 ? 'white' : 'red'
                            }}
                        >
                            <span className={styles.Top_brug_hover}>Brug: Porselein €195</span>
                            {teeth.teethNum}
                        </div>
                    ))}
                </Box>
                <Box className={styles.bottom_tooth_numbers}>
                    {state.bottomTooth.map((teeth, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setState({
                                    ...state,
                                    bottomTooth: state.bottomTooth.map((item, count) =>
                                        count === index ? { ...item, clickBrug: item.clickBrug + 1 } : item
                                    )
                                });
                            }}
                            className={styles.teethBottomNumber}
                            style={{
                                marginRight: teeth.marginRight,
                                backgroundColor: teeth.clickBrug % 2 === 1 ? 'red' : 'white',
                                color: teeth.clickBrug % 2 === 1 ? 'white' : 'red'
                            }}
                        >
                            <span className={styles.Bottom_brug_hover}>Brug: Porselein €195</span>
                            {teeth.teethNum}
                        </div>
                    ))}
                </Box>
                <>
                    {state.topTooth.map((item, id) =>
                        item.clickImplant % 2 === 1 && item.clickImplant > 0 ? (
                            <div className={styles.top_teeth_image}>
                                <img
                                    src={TopToothImages[id].imageUrl}
                                    alt=''
                                    style={{
                                        top: TopToothImages[id].top,
                                        left: TopToothImages[id].left
                                    }}
                                />
                            </div>
                        ) : null
                    )}
                </>
                <>
                    {state.bottomTooth.map((item, id) =>
                        item.clickImplant % 2 === 1 && item.clickImplant > 0 ? (
                            <div className={styles.bottom_teeth_image}>
                                <img
                                    src={BottomToothImages[id].imageUrl}
                                    alt=''
                                    style={{
                                        bottom: BottomToothImages[id].bottom,
                                        left: BottomToothImages[id].left
                                    }}
                                />
                            </div>
                        ) : null
                    )}
                </>
                <Box className={styles.tooth_buttons_top}>
                    {state.topTooth.map((topT, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                const TopTeeth = state.topTooth.map((item, count) =>
                                    count === index ? { ...item, clickImplant: item.clickImplant + 1 } : item
                                );
                                setState({
                                    ...state,
                                    topTooth: TopTeeth
                                });
                            }}
                            className={styles.teeth_btn_top}
                            style={{ width: topT.teethWidth }}
                        >
                            <span className={styles.top_implant_hover}>
                                <p>Implantaat: A-Kwaliteit €895</p>
                                <p>Material: Porselein €195</p>
                            </span>
                        </div>
                    ))}
                </Box>
                <Box className={styles.tooth_buttons_bottom}>
                    {state.bottomTooth.map((bottomT, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setState({
                                    ...state,
                                    bottomTooth: state.bottomTooth.map((item, count) =>
                                        count === index ? { ...item, clickImplant: item.clickImplant + 1 } : item
                                    )
                                });
                            }}
                            className={styles.teeth_btn_bottom}
                            style={{ width: bottomT.teethWidth }}
                        ></div>
                    ))}
                </Box>
            </Box>
        </div>
    );
}
