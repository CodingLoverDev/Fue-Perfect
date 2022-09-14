import {
    Box,
    Checkbox,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select
} from '@chakra-ui/react';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { DentalState, ImplantMaterials, ImplantOptions } from '../data';

export default function ImplantaatCom({ state, setState }: { state: DentalState; setState: Dispatch<SetStateAction<DentalState>> }) {
    const changeImplantaatOptions: ChangeEventHandler<HTMLSelectElement> = e => setState({ ...state, implantOptions: e.target.value });
    const changeImplantaatMaterials: ChangeEventHandler<HTMLSelectElement> = e => setState({ ...state, implantMaterials: e.target.value });

    return (
        <Box>
            <FormLabel mt={6}>Bone graft</FormLabel>
            <Checkbox ml={3} size='sm' colorScheme='green' value=''>
                € 275
            </Checkbox>
            <Box pt={4}>
                <FormLabel>Number of Bone graft</FormLabel>
                <NumberInput min={1} max={32} step={1} precision={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>
            <FormLabel mt={6}>Kualiteit Implantaat</FormLabel>
            <Select onChange={changeImplantaatOptions}>
                {ImplantOptions.map(v => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </Select>
            <FormLabel mt={6}>Material</FormLabel>
            <Select onChange={changeImplantaatMaterials}>
                {ImplantMaterials.map(v => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </Select>
        </Box>
    );
}
