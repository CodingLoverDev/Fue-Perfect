import { Box, FormLabel, Select } from '@chakra-ui/react';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { DentalState, Wortel } from '../data';

export default function WortelCom({ state, setState }: { state: DentalState; setState: Dispatch<SetStateAction<DentalState>> }) {
    const changeWortelOptions: ChangeEventHandler<HTMLSelectElement> = e => setState({ ...state, wortel: e.target.value });

    return (
        <Box>
            <FormLabel mt={6}>Opties</FormLabel>
            <Select mt={6} onChange={changeWortelOptions}>
                {Wortel.map(v => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </Select>
        </Box>
    );
}
