import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';
const meta = {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {}
} satisfies Meta<typeof Flex>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    direction: 'row'
  }
};

export const Column: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    direction: 'column'
  }
};

export const Gap4: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: '4'
  }
};

export const Gap8: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: '8'
  }
};

export const Gap16: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: '16'
  }
};

export const Gap32: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: '32'
  }
};
