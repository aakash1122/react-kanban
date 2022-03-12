import React, { useContext } from 'react';
import Column from './components/Column';
import AddColumn from './components/inputs/AddColumn';
import { KanbanContext } from './contexts/KanbanContext';

function App() {
  const Kanban = useContext(KanbanContext);
  const columns = Kanban.columns;

  const Columns = Object.keys(columns).map((key, index) => (
    <Column dataKey={key} key={`${key}-${index}`} />
  ));

  return (
    <div className="min-h-screen max-h-screen container mx-auto py-12 overflow-x-auto flex items-stretch flex-shrink-0 space-x-6">
      {Columns}
      <AddColumn />
    </div>
  );
}

export default App;
