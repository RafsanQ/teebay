import { Title, TextInput, Grid, Select } from '@mantine/core';


export function PageFour() {
  return (
    <div className='page'>
        <Title
          sx={{
            textAlign: 'center',
          }}
          order={2}
        >
          Select Price
        </Title>
        <br />
        <TextInput className='priceInput' 
            placeholder="Purchase Price"
            required
        />
        
        <Grid grow className='rentStuff'>
            <Grid.Col span={1}>
                <TextInput
                    placeholder='Rental Price'
                />
            </Grid.Col>
            <Grid.Col span={4}>
                <Select
                    placeholder='Rate'
                    data={[
                        { value: 'hour', label: 'per Hour' },
                        { value: 'day', label: 'per Day' },
                        { value: 'week', label: 'per Week' },
                        { value: 'month', label: 'per Month' },
                    ]}
                />
            </Grid.Col>
            
        </Grid>

    </div>
  );
}