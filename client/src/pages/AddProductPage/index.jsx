import { Button, Title } from '@mantine/core';

export function AddProductForm() {
  return (
    <div className='card-container'>
      <Title
        sx={{
          textAlign: 'center',
        }}
        order={2}
      >
        Hey there!
      </Title>
        {/* Steps */}
      <Button>Submit</Button>
    </div>
  );
}