import { shallowMount } from '@vue/test-utils';
import Items from '@/views/Items.vue';
import axios from 'axios';

jest.mock('axios');

describe('Items', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Items);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('adds an item', async () => {
    axios.post.mockResolvedValue({});
    const wrapper = shallowMount(Items);
    wrapper.vm.newItem = 'Test';
    await wrapper.vm.addItem();
    expect(wrapper.vm.error).toBe('');
    expect(wrapper.vm.newItem).toBe('');
    expect(axios.post).toHaveBeenCalledWith('https://web-tech-projekt.herokuapp.com/api/v1/items', { name: 'Test', imageUrl: '' });
  });

  it('marks an item as completed', async () => {
    axios.patch.mockResolvedValue({});
    const wrapper = shallowMount(Items);
    wrapper.vm.items = [{ id: 1, completed: false }];
    await wrapper.vm.markItemAsCompleted(0);
    expect(axios.patch).toHaveBeenCalledWith('https://web-tech-projekt.herokuapp.com/api/v1/items/1', { completed: true });
  });

  it('deletes an item', async () => {
    axios.delete.mockResolvedValue({});
    const wrapper = shallowMount(Items);
    wrapper.vm.items = [{ id: 1 }];
    await wrapper.vm.deleteItem(0);
    expect(axios.delete).toHaveBeenCalledWith('https://web-tech-projekt.herokuapp.com/api/v1/items/1');
  });
});
