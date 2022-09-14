import { Box, Checkbox, FormLabel, Select, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { AllOn, DentalState } from '../data';

import styles from '../content.module.scss';

export default function AllOnCom({ state, setState }: { state: DentalState; setState: Dispatch<SetStateAction<DentalState>> }) {
    // Main
    return (
        <Box>
            <FormLabel mt={6}>Opties</FormLabel>
            <Select
                mt={6}
                onChange={e => {
                    setState({ ...state, allOn: e.target.value });
                }}
            >
                {AllOn.map(v => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </Select>
            {state.allOn === 'All on 4' ? (
                <div className={styles.all_on}>
                    <Box>
                        <Checkbox size='sm' colorScheme='green'>
                            Porselein
                        </Checkbox>
                        <br />
                        <Checkbox size='sm' colorScheme='green'>
                            Zirconium
                        </Checkbox>
                    </Box>
                    <Box>
                        <Text fontSize='sm'>All On 4 Porselein: €13,500</Text>
                        <Text fontSize='sm'>All On 4 Zirconium: €14,500</Text>
                    </Box>
                </div>
            ) : (
                <div className={styles.all_on}>
                    <Box>
                        <Checkbox size='sm' colorScheme='green'>
                            Porselein
                        </Checkbox>
                        <br />
                        <Checkbox size='sm' colorScheme='green'>
                            Zirconium
                        </Checkbox>
                    </Box>
                    <Box>
                        <Text fontSize='sm'>All On 6 Porselein: €15,500</Text>
                        <Text fontSize='sm'>All On 6 Zirconium: €15,500</Text>
                    </Box>
                </div>
            )}
        </Box>
    );
}
