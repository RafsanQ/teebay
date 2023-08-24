import { Title, Textarea  } from '@mantine/core';

export function PageTwo() {
  return (
    <div className='page'>
        <Title
          sx={{
            textAlign: 'center',
          }}
          order={2}
        >
          Write a simple Description
        </Title>
        <br />
        <Textarea
            placeholder='Description'
            required
        />
    </div>
  );
}