import { Box, FormLabel, Select } from '@chakra-ui/react';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { DentalState, Sinuslift } from '../data';

export default function SinusliftCom({ state, setState }: { state: DentalState; setState: Dispatch<SetStateAction<DentalState>> }) {
    const changeSinusliftOptions: ChangeEventHandler<HTMLSelectElement> = e => setState({ ...state, sinuslift: e.target.value });

    return (
        <Box>
            <FormLabel mt={6}>Opties</FormLabel>
            <Select mt={6} onChange={changeSinusliftOptions}>
                {Sinuslift.map(v => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </Select>
        </Box>
    );
}
