#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { Table } from 'siddcn';

const TableDemo = () => {
  const columns = [
    { key: 'id', header: 'ID', width: 5 },
    { key: 'name', header: 'Name', width: 18 },
    { key: 'lang', header: 'Language', width: 12 },
    { key: 'stars', header: 'Stars', width: 9 },
    { key: 'status', header: 'Status', width: 12 },
  ];

  const data = [
    { id: '001', name: 'express', lang: 'JavaScript', stars: '64.2k', status: 'active' },
    { id: '002', name: 'react', lang: 'JavaScript', stars: '218k', status: 'active' },
    { id: '003', name: 'vue', lang: 'JavaScript', stars: '205k', status: 'active' },
    { id: '004', name: 'rust', lang: 'Rust', stars: '88.1k', status: 'active' },
    { id: '005', name: 'flask', lang: 'Python', stars: '66.3k', status: 'active' },
    { id: '006', name: 'django', lang: 'Python', stars: '77.4k', status: 'active' },
    { id: '007', name: 'spring-boot', lang: 'Java', stars: '72.1k', status: 'active' },
    { id: '008', name: 'rails', lang: 'Ruby', stars: '56.0k', status: 'stable' },
    { id: '009', name: 'gin', lang: 'Go', stars: '75.2k', status: 'active' },
    { id: '010', name: 'next.js', lang: 'JavaScript', stars: '121k', status: 'active' },
    { id: '011', name: 'svelte', lang: 'JavaScript', stars: '77.8k', status: 'active' },
    { id: '012', name: 'fastapi', lang: 'Python', stars: '75.9k', status: 'active' },
  ];

  const handleSelect = (row: any, index: number) => {
    console.log(`Selected: ${row.name} at index ${index}`);
  };

  return (
    <Table 
      columns={columns} 
      data={data}
      maxVisibleRows={10}
      onSelect={handleSelect}
    />
  );
};

render(<TableDemo />);
