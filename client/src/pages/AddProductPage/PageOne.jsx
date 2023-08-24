import { Title, TextInput  } from '@mantine/core';

export function PageOne() {
  return (
    <div className='page'>
        <Title
          sx={{
            textAlign: 'center',
          }}
          order={2}
        >
          Select Title for your Product
        </Title>
        <br />
        <TextInput
            placeholder="Title"
            required
        />
    </div>
  );
}