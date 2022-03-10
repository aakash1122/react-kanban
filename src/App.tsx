import React, { useContext } from 'react';
import Column from './components/Column';
import { KanbanContext } from './contexts/KanbanContext';

function App() {
  const Kanban = useContext(KanbanContext);
  const columns = Kanban.columns;

  const Columns = Object.keys(columns).map((key) => (
    <Column
      title="todo"
      key={key}
      dataKey={key}
      tasks={[
        { id: 'da', value: 'fdsafsda' },
        { id: 'ddsaa', value: '234' },
        { id: 'ddsa', value: '234dfs' }
      ]}
    />
  ));

  return <div className="container mx-auto py-12 overflow-x-auto flex space-x-6">{Columns}</div>;
}

export default App;
