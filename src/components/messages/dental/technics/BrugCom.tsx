import { Box, FormLabel, Select } from '@chakra-ui/react';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { BrugMaterials, BrugOptions, DentalState } from '../data';

export default function BrugCom({ state, setState }: { state: DentalState; setState: Dispatch<SetStateAction<DentalState>> }) {
    const changeBrugOptions: ChangeEventHandler<HTMLSelectElement> = e => setState({ ...state, brugOptions: e.target.value });
    const changeBrugMaterials: ChangeEventHandler<HTMLSelectElement> = e => setState({ ...state, brugMaterials: e.target.value });

    return (
        <Box>
            <FormLabel mt={6}>Opties</FormLabel>
            <Select mt={6} onChange={changeBrugOptions}>
                {BrugOptions.map(v => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </Select>
            <FormLabel mt={6}>Material</FormLabel>
            <Select onChange={changeBrugMaterials}>
                {BrugMaterials.map(v => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </Select>
        </Box>
    );
}
