import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { Group, Button } from '@mantine/core';

export function RentForm() {
  const [value, setValue] = useState([null, null]);

  async function handleRentOut(){
    console.log(value);
  }

  return (
    <div className='modal'>
        <Group position="center" className='dateForm'>
            <DatePicker type="range" value={value} onChange={setValue} />
        </Group>
        
        <div className='bottomSectionModal'>

            <Button color="violet" onClick={handleRentOut}>
                Rent Product
            </Button>
        </div>
        
    </div>
  );
}