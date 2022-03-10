export default class Localstorage {
  constructor(private name: string) {}

  setData(data: any) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }
  getData(data: any) {
    return JSON.parse(localStorage.getItem(this.name) || '');
  }
}

const KanbanStorage = new Localstorage('kanban-data');
