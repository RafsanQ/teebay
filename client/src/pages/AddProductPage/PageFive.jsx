import { Title } from '@mantine/core';

export function PageFive() {
  return (
    <div className='page'>
        <Title
          sx={{
            textAlign: 'center',
          }}
          order={2}
        >
          Summary
        </Title>
        <br />
        <div className='summary'>
            <h3> </h3>
            <h3> </h3>
            <h3>Purchase Price: </h3>
            <h3>Rental Rate: </h3>
        </div>
    </div>
  );
}