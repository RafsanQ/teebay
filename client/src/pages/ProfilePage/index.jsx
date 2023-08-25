import { Tabs } from '@mantine/core';
import { BoughtProducts } from './BoughtProducts';
import { SoldProducts } from './SoldProducts';

export function ProfilePage() {
  return (
    <Tabs defaultValue="bought">
      <Tabs.List grow>
        <Tabs.Tab value="bought">Bought</Tabs.Tab>
        <Tabs.Tab value="Sold">Sold</Tabs.Tab>
        <Tabs.Tab value="Borrowed">Borrowed</Tabs.Tab>
        <Tabs.Tab value="lent">Lent</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="bought" pt="xs">
        <BoughtProducts />
      </Tabs.Panel>

      <Tabs.Panel value="Sold" pt="xs">
        <SoldProducts/>
      </Tabs.Panel>

      <Tabs.Panel value="Borrowed" pt="xs">
        Settings tab content
      </Tabs.Panel>

      <Tabs.Panel value="lent" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}